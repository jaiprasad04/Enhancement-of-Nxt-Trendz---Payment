import {Component} from 'react'

import Popup from 'reactjs-popup'

import {IoCloseCircleOutline} from 'react-icons/io5'

import CartContext from '../../context/CartContext'

import './index.css'

class CartSummary extends Component {
  state = {selectedOption: '', showPlaceOrder: true}

  handleRadioChange = event => {
    this.setState({selectedOption: event.target.value})
  }

  onClickConfirm = () => {
    this.setState({showPlaceOrder: false})
  }

  render() {
    const {selectedOption, showPlaceOrder} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {cartList, removeAllCartItems} = value

          let total = 0
          cartList.forEach(eachCartItem => {
            total += eachCartItem.price * eachCartItem.quantity
          })

          const onClickRemove = () => {
            removeAllCartItems()
          }

          return (
            <>
              <div className="cart-summary-container">
                <h1 className="order-total-value">
                  <span className="order-total-label">Order Total:</span> Rs{' '}
                  {total}
                  /-
                </h1>
                <p className="total-items">{cartList.length} Items in cart</p>
                {showPlaceOrder ? (
                  <>
                    <Popup
                      modal
                      trigger={
                        <button type="button" className="checkout-button">
                          Checkout
                        </button>
                      }
                      className="payment-popup"
                    >
                      {close => (
                        <div className="payment-method-container">
                          <button
                            type="button"
                            className="close-button"
                            label="close"
                            onClick={() => close()}
                          >
                            <IoCloseCircleOutline size={22} />
                          </button>
                          <h1 className="payment-heading">Payment Section</h1>
                          <div className="payment-options">
                            <div className="payment-option">
                              <input
                                type="radio"
                                id="card"
                                name="payment"
                                value="Card"
                                checked={selectedOption === 'Card'}
                                onChange={this.handleRadioChange}
                                disabled
                              />
                              <label htmlFor="card" className="label-name">
                                Card
                              </label>
                            </div>
                            <div className="payment-option">
                              <input
                                type="radio"
                                id="netBanking"
                                name="payment"
                                value="Net Banking"
                                checked={selectedOption === 'Net Banking'}
                                onChange={this.handleRadioChange}
                                disabled
                              />
                              <label
                                htmlFor="netBanking"
                                className="label-name"
                              >
                                Net Banking
                              </label>
                            </div>
                            <div className="payment-option">
                              <input
                                type="radio"
                                id="upiWallet"
                                name="payment"
                                value="Upi Wallet"
                                checked={selectedOption === 'Upi Wallet'}
                                onChange={this.handleRadioChange}
                                disabled
                              />
                              <label htmlFor="upiWallet" className="label-name">
                                Upi Wallet
                              </label>
                            </div>
                            <div className="payment-option">
                              <input
                                type="radio"
                                id="cashOnDelivery"
                                name="payment"
                                value="Cash on Delivery"
                                checked={selectedOption === 'Cash on Delivery'}
                                onChange={this.handleRadioChange}
                              />
                              <label
                                htmlFor="cashOnDelivery"
                                className="label-name"
                              >
                                Cash on Delivery
                              </label>
                            </div>
                          </div>
                          <h1 className="order-total-value">
                            Order Total:{' '}
                            <span className="order-total-label">
                              Rs {total}
                              /- of {cartList.length} Item(s)
                            </span>
                          </h1>
                          <button
                            type="button"
                            className="confirm-order"
                            onClick={this.onClickConfirm}
                            disabled={selectedOption !== 'Cash on Delivery'}
                          >
                            Confirm Order
                          </button>
                        </div>
                      )}
                    </Popup>
                  </>
                ) : (
                  <>
                    <Popup modal className="payment-popup">
                      <div className="placed-method-container">
                        <button
                          type="button"
                          className="close-button"
                          label="close"
                          onClick={onClickRemove}
                        >
                          <IoCloseCircleOutline size={22} />
                        </button>
                        <p className="placed-order">
                          Your order has been placed successfully
                        </p>
                      </div>
                    </Popup>
                  </>
                )}
              </div>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

// <Popup
//   modal
//   trigger={
//     <button type="button" className="checkout-button d-lg-none">
//       Checkout
//     </button>
//   }
//   className="payment-popup"
// >
//   {close => (
//     <div className="popup-container">
//       <p className="logout-description">
//         Are you sure, you want to logout?
//       </p>
//       <div>
//         <button
//           type="button"
//           className="cancel-logout"
//           onClick={() => close()}
//         >
//           Cancel
//         </button>
//         <button type="button" className="confirm-logout">
//           Confirm
//         </button>
//       </div>
//     </div>
//   )}
// </Popup>

export default CartSummary
