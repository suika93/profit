import './App.css';
import albion from './lib/albion'
import { AppContextProvider, useAppContext } from './context'
import { Formik } from 'formik'

function Form() {
  const { state, setState } = useAppContext()
  const initialValues = {
    "DESIRED_QUANTITY": 999,
    "TIER": 5,
    "INGREDIENT_1_PRICE": 0,
    "INGREDIENT_2_PRICE": 0,
    "PRODUCT_UNITY_PRICE": 0
  }

  const onSubmit = (values) => {
    const requiredMaterials = albion.calculateRequiredMaterials(values.DESIRED_QUANTITY, { "tier": values.TIER })
    const totalCost = albion.calculateProductionCost({
      ingredient1Price: values.INGREDIENT_1_PRICE,
      ingredient2Price: values.INGREDIENT_2_PRICE,
      ingredient1Quantity: requiredMaterials.ingredient1Used,
      ingredient2Quantity: requiredMaterials.ingredient2Used
    })
    const profit = albion.calculateProfit(totalCost, values.PRODUCT_UNITY_PRICE, values.DESIRED_QUANTITY)
    const costPerProduct = albion.calculatePricePerProduct(values.DESIRED_QUANTITY, totalCost)

    setState({
      requiredMaterials,
      totalCost,
      profit,
      costPerProduct,
    })
  }

  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues}>
      {({ values,
        handleChange,
        handleSubmit }) => (
          <form onSubmit={handleSubmit} className="main-form">
            <div className="field-box">
              <label htmlFor="TIER">Tier:</label>
              <select id="TIER" name="TIER" onChange={handleChange} selected={values.DESIRED_QUANTITY}>
                <option value="3">Tier 3</option>
                <option value="4">Tier 4</option>
                <option value="5">Tier 5</option>
                <option value="6">Tier 6</option>
                <option value="7">Tier 7</option>
                <option value="8">Tier 8</option>
              </select>
            </div>

            <div className="field-box">
              <label htmlFor="DESIRED_QUANTITY">Quantidade desejada:</label>
              <input id="DESIRED_QUANTITY" name="DESIRED_QUANTITY" type="text" onChange={handleChange} value={values.DESIRED_QUANTITY} />
            </div>

            <div className="field-box">
              <label htmlFor="INGREDIENT_1_PRICE">Preco do ingrediente 1 (Fiber, Hide):</label>
              <input id="INGREDIENT_1_PRICE" name="INGREDIENT_1_PRICE" type="text" onChange={handleChange} value={values.INGREDIENT_1_PRICE} />
            </div>

            <div className="field-box">
              <label htmlFor="INGREDIENT_2_PRICE">Preco do ingrediente 2 (Cloth, Leather):</label>
              <input id="INGREDIENT_2_PRICE" name="INGREDIENT_2_PRICE" type="text" onChange={handleChange} value={values.INGREDIENT_2_PRICE} />
            </div>

            <div className="field-box">
              <label htmlFor="PRODUCT_UNITY_PRICE">Preco de venda unitario do produto fabricado:</label>
              <input id="PRODUCT_UNITY_PRICE" name="PRODUCT_UNITY_PRICE" type="text" onChange={handleChange} value={values.PRODUCT_UNITY_PRICE} />
            </div>
            <button type="submit" className="calculate-button">Calcular</button>
          </form>
        )}
    </Formik>
  )
}

function DisplayResults() {
  //   console.log({ requiredMaterials, totalCost, profit, costPerProduct })
  const appContext = useAppContext()
  if(appContext.state === undefined) return (<div></div>);
  console.log(appContext.state)
  const {
    requiredMaterials,
    totalCost,
    profit,
    costPerProduct
  } = appContext.state

  return (
    <div className="DisplayResults">
      <h1>Resultado</h1>
      <p>Total fabricado: <span>{requiredMaterials.producedAmmount}</span></p>
      <p>Quantidade de Ingrediente 1: <span>{requiredMaterials.ingredient1Used}</span></p>
      <p>Quantidade de Ingrediente 2: <span>{requiredMaterials.ingredient2Used}</span></p>
      <p>Custo total dos ingredientes: <span>{totalCost}</span></p>
      <p>Custo por produto fabricado: <span>{costPerProduct}</span></p>
      <p className="profit"><span>Lucro: {profit}</span></p>
    </div>
  )
}

function App() {
  return (
    <AppContextProvider>
      <div className="App">
        <Form />
        <DisplayResults />
      </div>
    </AppContextProvider>
  );
}

export default App;
