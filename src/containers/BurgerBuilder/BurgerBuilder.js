import React, {Component} from 'react'
import ReactAux from '../../hoc/ReactAux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRIZES = {
  salad: 0.5,
  bacon: 0.5,
  cheese: 1.3,
  meat: 0.7,
}

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrize: 4,
    purchasable: false,
    purchasing: false,
  }

  updatePurchaseState = (ingredients) => {

    const sum = Object.keys(ingredients).map((key) => {return ingredients[key]})
    .reduce((sum, c) => {return sum + c}, 0);

    this.setState({purchasable: sum > 0})

  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    alert('CONTINUE!')
  }


  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = updatedCount;

    const oldPrize = this.state.totalPrize;
    const newPrize = oldPrize + INGREDIENT_PRIZES[type];
    this.setState({ingredients: updatedIngredients, totalPrize: newPrize});
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount === 0) return;
    const updatedCount = oldCount - 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = updatedCount;

    const oldPrize = this.state.totalPrize;
    const newPrize = oldPrize - INGREDIENT_PRIZES[type];
    this.setState({ingredients: updatedIngredients, totalPrize: newPrize});
    this.updatePurchaseState(updatedIngredients);
  }

  render () {

    const disabledInfo = {
      ...this.state.ingredients
    }
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <ReactAux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            price={this.state.totalPrize}
            ingredients={this.state.ingredients}
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            />
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded = {this.addIngredientHandler}
          ingredientRemoved = {this.removeIngredientHandler}
          disabled = {disabledInfo}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
          price={this.state.totalPrize}
          />
      </ReactAux>
    )
  }
}

export default BurgerBuilder;
