import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../component/Navbar';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const Cart = () => {
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(null)
    const [totalQuantity, setTotalQuantity] = useState(null)
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            try {
                setCart(JSON.parse(storedCart));
            } catch (error) {
                setCart([]);
            }
        } else {
            setCart([]);
        }
    }, []);
    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart])
    useEffect(()=>{
        let totalQuantity =0;
        let totalAmount =0;
        cart.forEach(item =>{
            totalQuantity +=item.quantity;
            totalAmount +=item.price * item.quantity;
        })
        setTotalQuantity(totalQuantity);
        setTotalAmount(totalAmount);
    },[cart])
    const removeFromCart = (id)=>{
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
    }
    const clearCart = () => {
        localStorage.removeItem('cart');
        setCart([]);
    }
    const setIncrease =(id)=>{
        const newCart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemIndex = cart.findIndex(item => item.id === id);
        if(itemIndex !== -1){
            newCart[itemIndex].quantity +=1;
        }
        localStorage.setItem('cart', JSON.stringify(newCart));
        setCart(newCart);
    }
    const setDecrease = (id) =>{
        const newCart = JSON.parse(localStorage.getItem('cart')) ||[];
        const itemIndex = cart.findIndex(item => item.id === id);
        if(itemIndex !== -1){
            if(newCart[itemIndex].quantity >1){
                newCart[itemIndex].quantity -= 1;
            }else{
                newCart.splice(itemIndex, 1)
            }
            localStorage.setItem('cart', JSON.stringify(newCart));
            setCart(newCart);
        }
    }
    return (
        <div>
            <Navbar />
            <h2 className='font-bold text-white text-center bg-blue-400 my-3 p-4 text-2xl'>YOUR SHOPPING CART</h2>
            <div className='flex flex-wrap justify-center p-4'>
                {cart.length === 0 ? (
                    <p className='text-center font-bold text-2xl'> Your cart is empty</p>
                ) : (
                    <div className='w-full lg:w-2/3 px-4 lg:px-8 py-5'>
                        <table className='border-2  border-solid border-black w-full text-sm text-center text-black '>
                            <thead className='text-sm text-gray-900'>
                                <tr>
                                    <th scope='col' className='border-2 border-black px-6 py-3 text-left'>Product</th>
                                    <th scope='col' className='border-2 border-black px-6 py-3'>Quantity</th>
                                    <th scope='col' className='border-2 border-black px-6 py-3'>Price</th>
                                    <th scope='col' className='border-2 border-black px-6 py-3'>Action</th>
                                    <th scope='col' className='border-2 border-black px-6 py-3'>Removed Items</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((items) => (
                                    <tr key={items.id} className='border-2 mx-4 border-black'>
                                        <td className='border-2 border-black text-left'>{items.name}</td>
                                        <td className='border-2 border-black'>{items.quantity}</td>
                                        <td className='border-2 border-black'>{(items.price * items.quantity).toFixed(2)}</td>
                                        <td className='space-x-2 border-2 border-black'>
                                            <FontAwesomeIcon icon={faMinus} onClick={() => setDecrease(items.id)} className='px-2 py-1 cursor-pointer text-white bg-gray-500' />
                                            <FontAwesomeIcon icon={faPlus} onClick={() => setIncrease(items.id)} className='px-2 py-1 cursor-pointer text-white bg-gray-500' />
                                        </td>
                                        <td className='border-2 border-black'>
                                            <FontAwesomeIcon icon={faTrash} onClick={() => removeFromCart(items.id)} className='px-2 py-1 cursor-pointer bg-red-500 text-white' />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className='w-full lg:w-1/3 px-4'>
                    <table className=' border-2 border-black border-collapse my-5 mx-4 text-sm text-center text-black'>
                        <thead className='text-sm text-gray-900 border-collapse rounded-lg'>
                            <tr>
                                <th scope='col' className='border-2 px-6 py-3 border-black'>Total Quantity</th>
                                <th scope='col' className='border-2 px-6 py-3 border-black'>Total Amount</th>
                                <th scope='col' className='border-2 px-6 py-3 border-black'>Clear Cart</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='border-2 mx-4 border-black'>
                                <td className='border-2 border-black'>{totalQuantity}</td>
                                <td className='border-2 border-black'>$ {totalAmount?.toFixed(2)}</td>
                                <td className='border-2 border-black'>
                                    <FontAwesomeIcon onClick={clearCart} icon={faCircleCheck} className='cursor-pointer font-bold text-black h-5 w-5 mx-2' />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Link to="/address" className='inline-flex text-xl p-2 font-medium border-2 items-center border-black border-collapse mx-4 bg-blue-300 justify-center text-center text-black'>
                Add your Address here <FontAwesomeIcon icon={faHouseUser} className='text-red-950'/>
                </Link>
                </div>
            </div>
            </div>
    );
}
export default Cart;