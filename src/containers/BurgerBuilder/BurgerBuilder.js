import React, {Component} from 'react'
import ReactAux from '../../hoc/ReactAux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import axios from '../../axios-order'

const INGREDIENT_PRIZES = {
  salad: 0.5,
  bacon: 0.5,
  cheese: 1.3,
  meat: 0.7,
}

class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    totalPrize: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  }

  componentDidMount () {
    axios.get('https://react-my-burger-7ff50.firebaseio.com/ingredients.json')
      .then((response) => {
        this.setState({ingredients: response.data});
      })
      .catch((err) => {this.setState({error: true})})
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

    // this.setState({loading: true})
    //
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrize.toFixed(2),
    //   customer: {
    //     name: 'Jonibek Norboev',
    //     address: {
    //       street: 'testStreet 1',
    //       zipCode: '272-0033',
    //       country: 'Japan'
    //     },
    //     email: 'jonibeknorboev@gmail.com'
    //   },
    //   delivery: 'fastest',
    // }
    // axios.post('/orders.json', order)
    //   .then((value) => {
    //     this.setState({loading: false, purchasing: false})
    //   })
    //   .catch((err) => {
    //     this.setState({loading: false, purchasing: false})
    //   });
    const queryParams = [];

    for (let i in this.state.ingredients){
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }

    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
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

    let orderSummary = null
    if(this.state.loading){
      orderSummary = <Spinner />
    }

    let burger = this.state.error ? <p style={{textAlign: 'center'}}>Ingredients cannot be loaded! 404</p> : <Spinner />
    if(this.state.ingredients){
      burger = (
        <ReactAux>
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
      orderSummary = <OrderSummary
        price={this.state.totalPrize}
        ingredients={this.state.ingredients}
        purchaseCancel={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
        />
    }

    return (
      <ReactAux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </ReactAux>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios);
