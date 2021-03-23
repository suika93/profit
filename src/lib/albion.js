function getTierIngredientQuantity(tier) {
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

function calculateRequiredMaterials(finalQuantity, options) {
    if(finalQuantity < 200) {
      throw new Error("Invalid finalQuantity. Required minumum 200")
    }
    const [ingredient1Quantity, ingredient2Quantity] = getTierIngredientQuantity(options.tier)

    let producedAmmount = 0
    let ingredient1Used = 0
    let ingredient2Used = 0
    let iterations = 0
    let remainingAmmount = finalQuantity
    
    while(producedAmmount < finalQuantity) {
      if(remainingAmmount >= 200) {
        producedAmmount += 200
        ingredient1Used += ingredient1Quantity * 200 - Math.ceil(ingredient1Quantity * 200 * 0.366)
        ingredient2Used += ingredient2Quantity * 200 - Math.ceil(ingredient2Quantity * 200 * 0.366)
        remainingAmmount -= 200
      }
      else {
        producedAmmount += remainingAmmount
        ingredient1Used += ingredient1Quantity * remainingAmmount - Math.ceil(ingredient1Quantity * remainingAmmount * 0.366)
        ingredient2Used += ingredient2Quantity * remainingAmmount - Math.ceil(ingredient2Quantity * remainingAmmount * 0.366)
        remainingAmmount -= remainingAmmount
      }
      iterations++
    }
  
    return { producedAmmount, ingredient1Used, ingredient2Used, iterations }
}
  
function calculateProductionCost({ ingredient1Price, ingredient2Price, ingredient1Quantity, ingredient2Quantity}) {
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

const albion = { calculatePricePerProduct, calculateProductionCost, calculateProfit, calculateRequiredMaterials }
export default albion