function getIngredientQuantitiesForTier(tier) {
  switch(Number.parseInt(tier)) {
    case 3:
      return [2,1]
    case 4: 
      return [2,1]
    case 5:
      return [3,1]
    case 6:
      return [4,1]
    case 7:
      return [5,1]
    case 8:
      return [5,1]
    default:
      throw new Error("Invalid tier value")
  }
}

function getProductBaseValueFromTier(tier) {
  switch(Number.parseInt(tier)) {
    case 3:
      return 6
    case 4: 
      return 14
    case 5:
      return 30
    case 6:
      return 62
    case 7:
      return 126
    case 8:
      return 254
    default:
      throw new Error("Invalid tier value")
  }
}


function calculateUsageFee(feeTax, productBaseValue) {
  // FeePercentage * ProductValue * 5 / 100
  return Number.parseInt(feeTax) * Number.parseInt(productBaseValue) * 5 / 100
}

function calculateRequiredMaterials(producedAmmount, options) {
    const [ingredient1Quantity, ingredient2Quantity] = getIngredientQuantitiesForTier(options.tier)

    const ingredient1Used = ingredient1Quantity * producedAmmount - Math.ceil(ingredient1Quantity * producedAmmount * 0.366)
    const ingredient2Used = ingredient2Quantity * producedAmmount - Math.ceil(ingredient2Quantity * producedAmmount * 0.366)
  
    return { producedAmmount, ingredient1Used, ingredient2Used }
}
  
function calculateIngredientCost({ ingredient1Price, ingredient2Price, ingredient1Quantity, ingredient2Quantity }) {
    return ingredient1Price * ingredient1Quantity + ingredient2Price * ingredient2Quantity
}

function calculatePricePerProduct(totalProduced, totalCost) {
    return Math.ceil(totalCost / totalProduced)
}

function calculateProfit(cost, sellPrice, quantitySold) {
    const totalSell = quantitySold * sellPrice
    const taxDiscount = Math.ceil(totalSell * 0.045)
    return totalSell - taxDiscount - cost
}

const albion = { calculatePricePerProduct, calculateIngredientCost, calculateProfit, calculateRequiredMaterials, calculateUsageFee, getProductBaseValueFromTier }
export default albion