const categories = [
  { name: "Biryani", icon: "🍛" },
  { name: "Pizza", icon: "🍕" },
  { name: "Burgers", icon: "🍔" },
  { name: "South Indian", icon: "🥞" },
  { name: "Chinese", icon: "🍜" },
  { name: "Desserts", icon: "🍰" },
];

function Categories() {
  return (
    <section className="section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">EXPLORE</span>
          <h2>What's on your mind?</h2>
        </div>

        <p>
          Choose from your favourite food categories.
        </p>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <button className="category-card" key={category.name}>
            <span>{category.icon}</span>
            <h3>{category.name}</h3>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Categories;