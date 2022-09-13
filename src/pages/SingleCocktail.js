import React from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import authFetch from '../axios/custom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const {id} = useParams();
  const [loading, setLoading] = React.useState(false);
  const [cocktail, setCocktail] = React.useState(null);

  const fetchItem = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await authFetch(`/lookup.php?i=${id}`);
      const data = response.data;
      
      if (data.drinks) {
        const drink = data.drinks[0];

        const {
          strDrink: name,
          strDrinkThumb: image,
          strAlcoholic: info,
          strCategory: category,
          strGlass: glass,
          strInstructions: instructions
        } = drink;

        const newDrink = {
          name,
          image,
          info,
          category,
          glass,
          instructions,
          ingredients: []
        };

        for (let i = 1; i <= 15; i++) {

          if (!drink[`strIngredient${i}`]) break;

          newDrink.ingredients.push(drink[`strIngredient${i}`]);
        }
        setCocktail(newDrink);
      } else {
        setCocktail(null);
      }
      
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [id])

  useEffect(() => {
    fetchItem();
  }, [id, fetchItem]);

  if (loading) return <Loading />;

  if (!cocktail) return <h2 className='section-title'>no cocktail to display</h2>;

  //const {name,image,info,category,glass,instructions,ingredients} = cocktail;

  return (
    <section className='section cocktail-section'>
      <Link to="/" className="btn btn-primary">back home</Link>
      <h2 className="section-title">{cocktail.name}</h2>
      <div className="drink">
        <img src={cocktail.image} alt={cocktail.name} />
        <div className="drink-info">
          {
            Object.keys(cocktail).filter((label) => label !== "image").map((label) => {
              return <p key={label}>
                <span className="drink-data">{label} : </span>
                {
                label !== "ingredients" ? cocktail[label] :
                  cocktail[label].map((item, index) => {
                    return <span key={index}>{item}</span>;
                  })
                }
              </p>
            })
          }
        </div>
      </div>
    </section>
  )
}

export default SingleCocktail
