/* Tulips Garden menu: the single source for the website menu, menu.html and the PDF.
   Prices are in Kenya Shillings, written without "KSh".
   After changing anything here, rebuild the PDF and QR code: python3 tools/build_menu.py */
window.TULIPS_MENU = {
  phone: "0717 333 300",
  location: "Opposite Shell Petrol Station, Gikambura, Kikuyu",
  tiktok: "@tulipsgarden6",
  url: "https://fanfuraha-ui.github.io/tulips-garden/menu.html",

  platters: [
    { n: "Tulips Quad Platter", p: "3,900",
      d: "Beef portion, mbuzi portion, full broiler chicken, 2 choma sausages & greens. Any 3 sides.",
      tag: "Free 1L Minute Maid", img: "quad-platter" },
    { n: "Family Platter", sub: "Serves 6", p: "6,500",
      d: "Beef, pork, mutton & fish fillet portions, full chicken, 4 choma sausages & 2 greens. Any 4 sides.",
      tag: "Free 1L Minute Maid" }
  ],
  /* Food photos: menu item name -> file in assets/menu/photos/ (NAME.jpg thumbnail, NAME-lg.jpg large).
     Make new ones with: python3 tools/menu_photos.py FOLDER_WITH_ORIGINALS */
  photos: {
    "Tulips Full Breakfast": "full-breakfast",
    "Tea": "tea",
    "Coffee": "coffee",
    "Broiler Chicken": "broiler-chicken",
    "Kuku Kienyeji": "kuku-kienyeji",
    "Pork Spare Ribs": "spare-ribs",
    "Beef Maji Maji": "beef-maji-maji",
    "Beef Meat": "beef-meat",
    "Whole Tilapia": "tilapia",
    "Choma Sausages": "choma-sausages",
    "Special Choma Sausages": "special-sausages",
    "Brown Ugali": "brown-ugali",
    "Chapati": "chapati",
    "Spinach": "spinach",
    "Chips & Sausages": "chips-sausages",
    "Spaghetti & Meatballs": "spaghetti"
  },

  /* Food gallery on the website menu section: [photo file, caption]. Tap a photo to see it large. */
  gallery: [
    ["tomahawk-steak", "Tomahawk steaks off the grill"],
    ["steak-noodles", "Seared beef with noodles"],
    ["quad-platter", "Tulips Quad Platter"],
    ["spare-ribs", "Pork spare ribs"],
    ["tilapia", "Whole grilled tilapia"],
    ["broiler-chicken", "Roast broiler chicken"],
    ["kuku-kienyeji", "Kuku kienyeji"],
    ["beef-meat", "Beef, sliced to share"],
    ["beef-maji-maji", "Beef maji maji"],
    ["choma-sausages", "Choma sausages"],
    ["special-sausages", "Special choma sausages"],
    ["brown-ugali", "Brown ugali, chicken & greens"],
    ["full-breakfast", "Tulips Full Breakfast"],
    ["chapati", "Soft layered chapati"],
    ["chips-sausages", "Masala chips & sausages"],
    ["spaghetti", "Spaghetti & meatballs"],
    ["tea", "Kenyan chai"],
    ["coffee", "Hot black coffee"]
  ],

  platterNote: "Sides: chips, sauté, ugali, rice or wedges",

  /* Mains: [name, full / 1 kg price, half / ½ kg price, note] */
  mains: [
    ["Broiler Chicken", "1,400", "750"],
    ["Kuku Kienyeji", "2,000", "1,100"],
    ["Kuku Bahati", "2,900", "1,500"],
    ["Pork Meat", "1,500", "800", "per kg"],
    ["Pork Spare Ribs", "1,700", "900", "per kg"],
    ["Beef Maji Maji", "1,600", "800", "per kg"],
    ["Beef Meat", "1,500", "700", "per kg"],
    ["Mbuzi (Goat)", "1,500", "800", "per kg"],
    ["Whole Tilapia", "1,000", "", "grilled or poached"],
    ["Fish Fillet", "850", "", "grilled or poached"]
  ],

  /* Lists: [name, price, note] */
  breakfast: [
    ["Tulips Full Breakfast", "850", "2 eggs your way, 2 sausages, bacon & toast + tea, coffee or hot chocolate"],
    ["Tulips Mini Breakfast", "450", "Toast, 2 eggs & 1 sausage + a hot drink"],
    ["Spanish Omelette", "200"],
    ["Fried / Boiled Eggs", "150"],
    ["Bacon", "350"],
    ["Plantains", "400"],
    ["Pancakes (pair)", "100"]
  ],
  hotDrinks: [
    ["Tea", "200", "White 200 · Black 150"],
    ["Coffee", "200", "Black 150 · White 250"],
    ["Hot Chocolate", "250", "White 250 · Black 150"],
    ["Dawa", "250"],
    ["Glass of Milk", "200"],
    ["Bone Soup", "100"],
    ["Honey", "50"]
  ],
  snacks: [
    ["Sausages (2)", "150"],
    ["Samosas (2)", "150"],
    ["Choma Sausages", "150"],
    ["Special Choma Sausages", "200"],
    ["Burger", "650"],
    ["Chicken Wings", "650", "Dry fried, barbeque or honey glazed"],
    ["Fish Fingers", "650"]
  ],
  starches: [
    ["Chips", "250"],
    ["Sauté Potatoes", "350"],
    ["Potato Wedges", "350"],
    ["Mashed Potatoes", "350"],
    ["Boiled Potatoes", "250"],
    ["Ugali", "100"],
    ["Brown Ugali", "200"],
    ["Rice", "200"],
    ["Chapati", "100"],
    ["Brown Chapati", "100"]
  ],
  greens: [
    ["Spinach", "150"],
    ["Managu / Kienyeji", "200"],
    ["Steamed Cabbage", "150"]
  ],
  kids: [
    ["Chips & Sausages", "350"],
    ["Fish Fingers & Chips", "550"],
    ["Burger with Chips", "550"],
    ["Chicken Nuggets & Chips", "550"],
    ["Spaghetti & Meatballs", "500"]
  ]
};
