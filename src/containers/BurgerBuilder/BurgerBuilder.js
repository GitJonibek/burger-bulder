import React, {Component} from 'react'
import ReactAux from '../../hoc/ReactAux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

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
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = updatedCount;

    const oldPrize = this.state.totalPrize;
    const newPrize = oldPrize + INGREDIENT_PRIZES[type];
    this.setState({ingredients: updatedIngredients, totalPrize: newPrize});
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
  }

  render () {

    const disabledInfo = {
      ...this.state.ingredients
    }

    return (
      <ReactAux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded = {this.addIngredientHandler}
          ingredientRemoved = {this.removeIngredientHandler}
          />
      </ReactAux>
    )
  }
}

export default BurgerBuilder;
