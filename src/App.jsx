import { useState, useEffect } from "react";
import "./App.css"
function App() {
  const [name, setName] = useState("ayxan")
  const [age, setAge] = useState(29)
  const [firends, setFirends] = useState(['ayxan', 'eli', 'ibrahim'])
  const [adress, setAdress] = useState({titile:'istanbuk', zip:23456})
  const [number, setNumber] = useState(0)
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [categories, setCategories] = useState([]);        
  const [selectedCategory, setSelectedCategory] = useState("all"); 
  const [priceFilter, setPriceFilter] = useState("")

 useEffect(()=>{
  fetch('https://api.escuelajs.co/api/v1/products')
  .then(res => res.json())
  .then(data=> {
    setProducts(data);               
    setFilteredProducts(data);       
    const allCategories = ["all", ...new Set(data.map(item => item.category.name))];
    setCategories(allCategories);
  });
 },[]);


 const handleFilter = (category) => {
  setSelectedCategory(category); 

  if (category === "all") {
    setFilteredProducts(products); 
  } else {
    const filtered = products.filter(item => item.category.name === category);
    setFilteredProducts(filtered); 
  }
};

const handlePriceFilter = (e) => {
  const value = e.target.value;
  setPriceFilter(value);

  if( value === "") {
    setFilteredProducts(products);
  } else {
    const filtered = products.filter(product => 
      (product.price) === Number(value)
    );
    setFilteredProducts(filtered)
  }
}


  return (
    <>
     <div>
      <h1>Merhaba {name}! {age}</h1>
      <button onClick={() => setName("eli")}>Click</button>
      <button onClick={() => setAge(30)}>Click</button>
     </div>
     

     <hr />
     <br />
     <br />

     <h1>Firends</h1>
     {firends.map((firend, index) => (
      <div key={index}>{firend}</div>
     )) }

     <button onClick={()=>setFirends([...firends, 'ayshe'])}> click</button>

     <hr />
     <br />
     <br />
     <h2>Adress</h2>

     <p>{adress.titile} {adress.zip} </p>
     <button onClick={() => setAdress({...adress, titile:"ankara", zip:45643})}>Clicl</button>
     
     <hr />
     <br />
     <br />

     <h2>sayach</h2>
    <div>
      {number}
    </div>

    <button 
    onClick={()=> setNumber(num => num+1) }
    disabled = {number >=20}
    >+
    </button>
    <button onClick={() =>setNumber(num => num-1)}
    disabled = {number === 0}
    >-</button>
    <button onClick={() => setNumber(0)}
    disabled = {number === 0}
    >Reset</button>

    <hr />
    <br />
    <br />

    <h1>məhhsullar</h1>

    <div style={{ marginBottom: "16px", marginTop: "16px" }}>
  <input 
    type="number" 
    value={priceFilter}
    onChange={handlePriceFilter}
    placeholder="Qiymətə görə axtar"
    style={{ padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
  />
  </div>


    {categories.map((cat, index) => (
  <button 
    key={index} 
    onClick={() => handleFilter(cat)}
    style={{
      marginRight: "8px",
      backgroundColor: selectedCategory === cat ? "#1A4D2E" : "#eee",
      color: selectedCategory === cat ? "white" : "black"
    }}
  >
    {cat}
  </button>
    ))}


<div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "20px" }}>
  {filteredProducts.map(product => (
    <div
      key={product.id}
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "12px",
        width: "200px"
      }}
    >
      <img
        src={product.images?.[0]}
        alt={product.title}
        style={{ width: "100px", height: "100px", objectFit: "contain" }}
      />
      <h4>{product.title}</h4>
      <p>{product.category.name}</p>
      <p>{product.description}</p>
      <p>{product.price} ₼</p>
    </div>
  ))}
  </div>



   



     

  







    </>
  );
}

export default App;
