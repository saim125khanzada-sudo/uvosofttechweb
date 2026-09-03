// Hardware Store Categories & Expanded Inventory in PKR (Pakistani Rupees)

const hardwareCategories = [
  { id: 'laptops', name: 'Laptops & MacBooks', slug: 'laptops', icon: '💻', description: 'Enterprise ThinkPads, MacBooks, Dell Latitude, HP EliteBooks & Gaming Laptops.' },
  { id: 'ram', name: 'RAM (Memory)', slug: 'ram', icon: '⚡', description: 'DDR3, DDR4 & DDR5 RAM for Desktop & Laptop workstations.' },
  { id: 'storage', name: 'Storage (HDD / SSD / NVMe)', slug: 'storage', icon: '🗄️', description: 'High-speed M.2 NVMe SSDs, SATA SSDs, and enterprise Hard Disks.' },
  { id: 'monitors', name: 'Desktop LCDs & Monitors', slug: 'monitors', icon: '🖥️', description: 'HD, Full HD, IPS & Curved Gaming LCD Monitors (19" to 27").' },
  { id: 'accessories', name: 'Computer Peripherals & Headsets', slug: 'accessories', icon: '🎧', description: 'Noise-canceling headsets, mechanical keyboards, gaming mice & cables.' }
];

const hardwareProducts = [
  // 1. LAPTOPS
  {
    id: 'prod-lap-1',
    name: 'Lenovo ThinkPad T14 Gen 2 (Core i7 11th Gen)',
    slug: 'lenovo-thinkpad-t14-gen2',
    categorySlug: 'laptops',
    categoryName: 'Laptops & MacBooks',
    price: 135000,
    comparePrice: 155000,
    image: '/images/products/laptop-thinkpad.jpg',
    specs: ['Intel Core i7-1165G7', '16GB DDR4 RAM', '512GB NVMe SSD', '14" FHD IPS Anti-Glare', 'Windows 11 Pro'],
    inStock: true,
    condition: 'Refurbished Grade A+',
    sku: 'LNV-T14G2-i7',
    featured: true
  },
  {
    id: 'prod-lap-2',
    name: 'Dell Latitude 5420 (Core i5 11th Gen)',
    slug: 'dell-latitude-5420',
    categorySlug: 'laptops',
    categoryName: 'Laptops & MacBooks',
    price: 98000,
    comparePrice: 110000,
    image: '/images/products/laptop-dell.jpg',
    specs: ['Intel Core i5-1145G7', '16GB DDR4 RAM', '256GB NVMe SSD', '14" FHD Display', 'Backlit Keyboard'],
    inStock: true,
    condition: 'Refurbished Grade A+',
    sku: 'DEL-LAT-5420',
    featured: true
  },
  {
    id: 'prod-lap-3',
    name: 'Apple MacBook Pro 14" M1 Pro (16GB / 512GB)',
    slug: 'apple-macbook-pro-14-m1',
    categorySlug: 'laptops',
    categoryName: 'Laptops & MacBooks',
    price: 345000,
    comparePrice: 380000,
    image: '/images/products/macbook-pro.jpg',
    specs: ['Apple M1 Pro Chip', '16GB Unified Memory', '512GB Superfast SSD', '14.2" Liquid Retina XDR', 'Space Gray'],
    inStock: true,
    condition: 'Like New Box Pack',
    sku: 'APP-MBP14-M1',
    featured: true
  },
  {
    id: 'prod-lap-4',
    name: 'HP EliteBook 840 G8 (Core i7 11th Gen)',
    slug: 'hp-elitebook-840-g8',
    categorySlug: 'laptops',
    categoryName: 'Laptops & MacBooks',
    price: 128000,
    comparePrice: 140000,
    image: '/images/products/laptop-hp.jpg',
    specs: ['Intel Core i7 11th Gen', '16GB DDR4', '512GB NVMe SSD', '14" FHD IPS', 'Bang & Olufsen Audio'],
    inStock: true,
    condition: 'Refurbished Grade A+',
    sku: 'HP-ELITE-840G8',
    featured: false
  },

  // 2. RAM (DDR3, DDR4, DDR5)
  {
    id: 'prod-ram-1',
    name: 'Kingston 8GB DDR3 1600MHz Desktop RAM',
    slug: 'kingston-8gb-ddr3-desktop',
    categorySlug: 'ram',
    categoryName: 'RAM (Memory)',
    price: 3200,
    comparePrice: 4000,
    image: '/images/products/ram-ddr3.jpg',
    specs: ['8GB Capacity', 'DDR3 1600MHz CL11', '1.5V Standard', 'For Desktop PCs'],
    inStock: true,
    condition: 'Brand New',
    sku: 'KNG-RAM-D3-8GB',
    featured: false
  },
  {
    id: 'prod-ram-2',
    name: 'Corsair Vengeance LPX 16GB DDR4 3200MHz RAM',
    slug: 'corsair-vengeance-16gb-ddr4',
    categorySlug: 'ram',
    categoryName: 'RAM (Memory)',
    price: 9500,
    comparePrice: 11500,
    image: '/images/products/ram-ddr4.jpg',
    specs: ['16GB (1x16GB)', 'DDR4 3200MHz', 'Heat Spreader Aluminum', 'XMP 2.0 Ready'],
    inStock: true,
    condition: 'Brand New Boxed',
    sku: 'COR-VEN-D4-16G',
    featured: true
  },
  {
    id: 'prod-ram-3',
    name: 'Crucial 32GB DDR5 5600MHz Desktop Memory',
    slug: 'crucial-32gb-ddr5-5600',
    categorySlug: 'ram',
    categoryName: 'RAM (Memory)',
    price: 28500,
    comparePrice: 32000,
    image: '/images/products/ram-ddr5.jpg',
    specs: ['32GB DDR5 Module', '5600MHz High Speed', 'Next-Gen Intel/AMD Ready', 'On-module PMIC'],
    inStock: true,
    condition: 'Brand New',
    sku: 'CRU-RAM-D5-32G',
    featured: true
  },
  {
    id: 'prod-ram-4',
    name: 'Kingston 16GB DDR4 3200MHz Laptop RAM (SODIMM)',
    slug: 'kingston-16gb-ddr4-laptop',
    categorySlug: 'ram',
    categoryName: 'RAM (Memory)',
    price: 8800,
    comparePrice: 10200,
    image: '/images/products/ram-laptop.jpg',
    specs: ['16GB SODIMM', 'DDR4 3200MHz', 'Low Power 1.2V', 'Laptop Upgrade'],
    inStock: true,
    condition: 'Brand New',
    sku: 'KNG-LAP-D4-16G',
    featured: false
  },

  // 3. STORAGE (HDD, SATA SSD, M.2 NVMe)
  {
    id: 'prod-sto-1',
    name: 'Seagate BarraCuda 2TB 3.5" Hard Disk (HDD)',
    slug: 'seagate-barracuda-2tb-hdd',
    categorySlug: 'storage',
    categoryName: 'Storage (HDD / SSD / NVMe)',
    price: 12500,
    comparePrice: 14500,
    image: '/images/products/storage-hdd.jpg',
    specs: ['2TB Capacity', '7200 RPM Spin', 'SATA 6Gb/s Interface', '256MB Cache'],
    inStock: true,
    condition: 'Brand New',
    sku: 'SEA-HDD-2TB',
    featured: false
  },
  {
    id: 'prod-sto-2',
    name: 'Lexar NS100 256GB 2.5" SATA III SSD',
    slug: 'lexar-ns100-256gb-sata-ssd',
    categorySlug: 'storage',
    categoryName: 'Storage (HDD / SSD / NVMe)',
    price: 5800,
    comparePrice: 6800,
    image: '/images/products/storage-sata-ssd.jpg',
    specs: ['256GB SATA SSD', 'Up to 520MB/s Read', '2.5-inch 7mm Form Factor', 'Shock & Vibration Resistant'],
    inStock: true,
    condition: 'Brand New Boxed',
    sku: 'LEX-SSD-256G',
    featured: true
  },
  {
    id: 'prod-sto-3',
    name: 'Samsung 980 PRO 1TB M.2 PCIe Gen4 NVMe SSD',
    slug: 'samsung-980-pro-1tb-nvme',
    categorySlug: 'storage',
    categoryName: 'Storage (HDD / SSD / NVMe)',
    price: 24500,
    comparePrice: 28000,
    image: '/images/products/storage-nvme.jpg',
    specs: ['1TB M.2 NVMe SSD', 'PCIe 4.0 Interface', '7000MB/s Read Speed', 'Compact 2280 Form Factor'],
    inStock: true,
    condition: 'Brand New Boxed',
    sku: 'SAM-980P-1TB',
    featured: true
  },

  // 4. DESKTOP LCDs & MONITORS
  {
    id: 'prod-mon-1',
    name: 'Dell 24" IPS Full HD Monitor (P2419H)',
    slug: 'dell-24-inch-ips-fhd-monitor',
    categorySlug: 'monitors',
    categoryName: 'Desktop LCDs & Monitors',
    price: 26500,
    comparePrice: 31000,
    image: '/images/products/monitor-dell-24.jpg',
    specs: ['24" IPS Panel', '1920x1080 Full HD', 'Height & Pivot Adjustable Stand', 'DisplayPort, HDMI, VGA'],
    inStock: true,
    condition: 'Refurbished Grade A+',
    sku: 'DEL-P2419H',
    featured: true
  },
  {
    id: 'prod-mon-2',
    name: 'HP 22" LED Full HD Monitor (V22v)',
    slug: 'hp-22-inch-led-fhd-monitor',
    categorySlug: 'monitors',
    categoryName: 'Desktop LCDs & Monitors',
    price: 18500,
    comparePrice: 21000,
    image: '/images/products/monitor-hp-22.jpg',
    specs: ['21.5" Full HD Display', '75Hz Refresh Rate', 'Low Blue Light Mode', 'HDMI & VGA Ports'],
    inStock: true,
    condition: 'Brand New Boxed',
    sku: 'HP-V22V-FHD',
    featured: false
  },
  {
    id: 'prod-mon-3',
    name: 'Samsung 27" Odyssey G3 144Hz Gaming Monitor',
    slug: 'samsung-27-odyssey-g3-144hz',
    categorySlug: 'monitors',
    categoryName: 'Desktop LCDs & Monitors',
    price: 49500,
    comparePrice: 55000,
    image: '/images/products/monitor-gaming-27.jpg',
    specs: ['27" Full HD VA Panel', '144Hz Refresh Rate', '1ms Response Time', 'AMD FreeSync Premium'],
    inStock: true,
    condition: 'Brand New Boxed',
    sku: 'SAM-ODYS-27G3',
    featured: true
  },

  // 5. PERIPHERALS & HEADSETS
  {
    id: 'prod-acc-1',
    name: 'HyperX Cloud II Gaming Headset (7.1 Surround)',
    slug: 'hyperx-cloud-2-gaming-headset',
    categorySlug: 'accessories',
    categoryName: 'Computer Peripherals & Headsets',
    price: 14800,
    comparePrice: 17500,
    image: '/images/products/headset-hyperx.jpg',
    specs: ['7.1 Virtual Surround Sound', 'Detachable Noise-Canceling Mic', 'Memory Foam Ear Cushions', 'USB Audio Control Box'],
    inStock: true,
    condition: 'Brand New Boxed',
    sku: 'HYP-CLD2-HEAD',
    featured: true
  },
  {
    id: 'prod-acc-2',
    name: 'Redragon K552 Mechanical Gaming Keyboard',
    slug: 'redragon-k552-mechanical-keyboard',
    categorySlug: 'accessories',
    categoryName: 'Computer Peripherals & Headsets',
    price: 7200,
    comparePrice: 8500,
    image: '/images/products/keyboard-mechanical.jpg',
    specs: ['TKL Compact Layout', 'Dustproof Mechanical Switches', 'RGB Backlit Effects', 'Solid Metal Alloy Base'],
    inStock: true,
    condition: 'Brand New',
    sku: 'RED-K552-RGB',
    featured: false
  }
];

function formatPKR(amount) {
  return 'Rs. ' + Number(amount).toLocaleString('en-PK');
}

module.exports = {
  hardwareCategories,
  hardwareProducts,
  formatPKR
};
