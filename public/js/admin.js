document.addEventListener('DOMContentLoaded', function() {
  var sidebarToggle = document.getElementById('sidebarToggle');
  var sidebar = document.getElementById('adminSidebar');
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('open');
    });
  }

  function getCsrfToken() {
    var meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.getAttribute('content') : null;
  }

  function apiRequest(method, url, data) {
    var headers = { 'Accept': 'application/json' };
    var body = null;
    if (data) {
      if (data instanceof FormData) {
        body = data;
      } else {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(data);
      }
    }
    return fetch(url, { method: method, headers: headers, body: body })
      .then(function(res) { return res.json().then(function(json) { return { ok: res.ok, status: res.status, data: json }; }); });
  }

  function handleFormSubmit(form) {
    var entity = form.dataset.entity;
    var id = form.dataset.id;
    var method = id ? 'PUT' : 'POST';
    var url = '/admin/api/' + entity + (id ? '/' + id : '');
    var formData = new FormData(form);
    var data = {};

    var checkboxes = form.querySelectorAll('input[type="checkbox"]');
    var checkedMap = {};
    checkboxes.forEach(function(cb) {
      if (cb.name === 'roleIds' || cb.name === 'permissionIds') {
        if (!checkedMap[cb.name]) checkedMap[cb.name] = [];
        if (cb.checked) checkedMap[cb.name].push(cb.value);
      }
    });

    formData.forEach(function(val, key) {
      if (key === 'roleIds' || key === 'permissionIds') return;
      if (key === 'triggerKeywordsRaw' && entity === 'chatbot') {
        data.triggerKeywords = val.split(',').map(function(k) { return k.trim(); }).filter(function(k) { return k.length > 0; });
        return;
      }
      if (key === 'isActive') {
        data[key] = true;
        return;
      }
      data[key] = val;
    });

    Object.keys(checkedMap).forEach(function(key) {
      data[key] = checkedMap[key];
    });

    if (!data.isActive) {
      var activeCheckbox = form.querySelector('input[name="isActive"]');
      if (activeCheckbox && !activeCheckbox.checked) data.isActive = false;
    }

    apiRequest(method, url, data)
      .then(function(result) {
        if (result.ok && result.data.success !== false) {
          window.location.href = '/admin/' + entity.replace(/s$/, '');
        } else {
          var msg = result.data.error || (result.data.errors ? result.data.errors.join(', ') : 'An error occurred');
          alert(msg);
        }
      })
      .catch(function() { alert('An error occurred. Please try again.'); });
  }

  document.querySelectorAll('.admin-form').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      handleFormSubmit(form);
    });
  });

  document.querySelectorAll('.btn-delete').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var entity = btn.dataset.entity;
      var id = btn.dataset.id;
      if (!confirm('Are you sure you want to delete this item?')) return;
      apiRequest('DELETE', '/admin/api/' + entity + '/' + id)
        .then(function(result) {
          if (result.ok) {
            var row = btn.closest('tr');
            if (row) row.remove();
            else { var card = btn.closest('.media-item'); if (card) card.remove(); else btn.closest('.detail-card') && (window.location.href = '/admin/' + entity.replace(/s$/, '')); }
          } else {
            alert(result.data.error || 'Failed to delete');
          }
        })
        .catch(function() { alert('An error occurred.'); });
    });
  });

  document.querySelectorAll('.btn-copy-url').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var url = btn.dataset.url;
      var fullUrl = window.location.origin + url;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(fullUrl).then(function() {
          btn.textContent = 'Copied!';
          setTimeout(function() { btn.textContent = 'Copy URL'; }, 2000);
        });
      } else {
        var input = document.createElement('input');
        input.value = fullUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        btn.textContent = 'Copied!';
        setTimeout(function() { btn.textContent = 'Copy URL'; }, 2000);
      }
    });
  });

  var mediaUploadForm = document.getElementById('mediaUploadForm');
  if (mediaUploadForm) {
    mediaUploadForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var fileInput = document.getElementById('mediaFile');
      if (!fileInput.files.length) { alert('Please select a file'); return; }
      var formData = new FormData();
      formData.append('file', fileInput.files[0]);
      var altInput = document.getElementById('mediaAltText');
      if (altInput && altInput.value) formData.append('altText', altInput.value);
      fetch('/admin/api/media/upload', { method: 'POST', body: formData })
        .then(function(res) { return res.json(); })
        .then(function(result) {
          if (result.success) { window.location.reload(); }
          else { alert(result.error || 'Upload failed'); }
        })
        .catch(function() { alert('Upload failed'); });
    });
  }

  document.querySelectorAll('.btn-mark-responded').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var id = btn.dataset.id;
      apiRequest('PUT', '/admin/api/contacts/' + id + '/respond')
        .then(function(result) {
          if (result.ok) window.location.reload();
          else alert('Failed to update');
        })
        .catch(function() { alert('An error occurred.'); });
    });
  });

  var saveAllSettings = document.getElementById('saveAllSettings');
  if (saveAllSettings) {
    saveAllSettings.addEventListener('click', function() {
      var inputs = document.querySelectorAll('.setting-input');
      var promises = [];
      inputs.forEach(function(input) {
        var key = input.dataset.key;
        var value;
        if (input.type === 'checkbox') {
          value = input.checked;
        } else if (input.type === 'number') {
          value = parseFloat(input.value);
        } else if (input.tagName === 'TEXTAREA' && (value = input.value.trim()) && (value.startsWith('{') || value.startsWith('['))) {
          try { value = JSON.parse(input.value); } catch(e) { value = input.value; }
        } else {
          value = input.value;
        }
        promises.push(
          apiRequest('PUT', '/admin/api/settings/' + encodeURIComponent(key), { value: value })
        );
      });
      Promise.all(promises).then(function(results) {
        var failed = results.filter(function(r) { return !r.ok; });
        if (failed.length === 0) {
          alert('All settings saved successfully');
        } else {
          alert('Some settings failed to save');
        }
      }).catch(function() { alert('An error occurred while saving settings'); });
    });
  }

  var profileForm = document.getElementById('profileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var formData = new FormData(profileForm);
      var data = {};
      formData.forEach(function(val, key) {
        if (val !== '') data[key] = val;
      });
      apiRequest('PUT', '/admin/api/profile', data)
        .then(function(result) {
          if (result.ok) { alert('Profile updated successfully'); }
          else { alert(result.data.error || 'Failed to update profile'); }
        })
        .catch(function() { alert('An error occurred'); });
    });
  }
});
