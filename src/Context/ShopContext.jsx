import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify'
import axios from "axios";
import { assets } from "../assets/assets";


export const shopContext = createContext()

const shopContextProvider = (props) => {
    const [search, setSearch] = useState('')
    const [adminToken, setAdminToken] = useState('')
    const [searchExpand, setSearchExpand] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [wishlistItems, setWishlistItems] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [token, setToken] = useState("")
    const [profileImage, setProfileImage] = useState('')
    const [userName, setUserName] = useState('')
    const [orderItems, setOrderItems] = useState([])
    const [loading, setLoading] = useState(true)

    const backendUrl = "https://ecocart-backend.onrender.com"
  
    const isProductWithoutSize = (itemId) => {
        const product = allProducts.find(p => p._id === itemId);
        return !product?.sizes;
    };

    const fetchAllProducts = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${backendUrl}/api/product/allproduct`)
            if (response.data.success) {
                setAllProducts(response.data.allProducts)
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false)
        }

    }

    const getTotalamount = () => {
        let total = 0;
        if (allProducts.length > 0) {

            for (const items in cartItems) {
                const productInfo = allProducts.find((item) => String(item._id) == String(items))
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        total += cartItems[items][item] * productInfo.price
                    }
                }
            }
        }
        return Math.round(total)
    }

    const getOrderItems = async () => {
        try {

            if (localStorage.getItem('token')) {
                const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { Authorization: `Bearer ${token}` } })
                if (response.data.success) {
                    setOrderItems(response.data.orders)
                }
            }
        } catch (error) {
            console.log(error);

        }
    }

    const addTocart = async (itemId, size) => {
        if (!size & !isProductWithoutSize(itemId)) {
            toast.error('Select Product size')
            return;
        }
        const product = allProducts.find((item) => item._id === itemId)
        if (product.size && !size) {
            toast.error("Please select product size")
            return;
        }
        const cartData = structuredClone(cartItems)

        if (cartData[itemId]) {
            if (size) {

                if (cartData[itemId][size]) {
                    cartData[itemId][size] += 1;
                } else {
                    cartData[itemId][size] = 1;
                }
            } else {
                cartData[itemId]["no_size"] = (cartData[itemId]["no_size"] || 0) + 1
            }
        } else {
            cartData[itemId] = {};
            if (size) {
                cartData[itemId][size] = 1;
            } else {
                cartData[itemId]["no_size"] = 1;
            }
        }

        if (token) {
            try {
                const response = await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { Authorization: `Bearer ${token}` } })
                if (response.data.success) {
                    toast.success("Product added to cart")
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
        setCartItems(cartData)

    }

    const getUserCart = async (token) => {
        if (token) {
            try {
                const response = await axios.get(backendUrl + '/api/cart/get', { headers: { Authorization: `Bearer ${token}` } })
                if (response.data.success) {
                    setCartItems(response.data.cartData)
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }


    const getCartCount = () => {
        let total = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    total += cartItems[items][item]
                }
            }
        }

        return total
    }

    const updateCartItems = async (itemId, size, quantity) => {
        const cartData = structuredClone(cartItems)

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }
        if (size) {
            if (quantity > 0) {
                cartData[itemId][size] = quantity;
            } else {
                delete cartData[itemId][size];
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
                toast.success("product removed")
            }
        } else {
            if (quantity > 0) {
                cartData[itemId]["no_size"] = quantity;
            } else {
                delete cartData[itemId]["no_size"]
                window.location.reload()
                if (Object.keys(cartData[itemId]).length <= 0) {
                    delete cartData[itemId];
                    window.location.reload()
                }
            }
        }
        setCartItems(cartData)
        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { Authorization: `Bearer ${token}` } })
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
        getUserCart(token)
        getTotalCartAmount()
        getTotalCartDiscount()
    }

    const getTotalCartAmount = () => {
        let total = 0;

        if (!allProducts || allProducts.length === 0) {
            return total
        }
        for (const items in cartItems) {
            if (allProducts) {
                const productInfo = allProducts.find((item) => String(item._id) === String(items));
                const discountPrice = productInfo.price - (productInfo.price * productInfo.offer / 100)
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        total += cartItems[items][item] * discountPrice
                    }
                }
            }
        }
        return Math.round(total)
    }

    const getTotalCartDiscount = () => {
        let total = 0;
        if (!allProducts || allProducts.length === 0) {
            return total
        }
        for (const items in cartItems) {
            const productInfo = allProducts.find((item) => item._id === items)
            const offerPrice = (productInfo.price * productInfo.offer / 100)
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    total += cartItems[items][item] * offerPrice
                }
            }
        }
        return Math.round(total)
    }

    const addToWIshlist = async (id) => {
        let wishlistData = structuredClone(wishlistItems)

        if (!wishlistData.includes(id)) {
            wishlistData.push(id)
        } else {
            wishlistData = wishlistData.filter((item) => item !== id)
        }

        if (token) {
            try {
                console.log(`${backendUrl}/api/wishlist/add`);

                await axios.post(`${backendUrl}/api/wishlist/add`, { itemId: id }, { headers: { Authorization: `Bearer ${token}` } });
            } catch (error) {
                console.log(error);
            }
        }

        setWishlistItems(wishlistData)
    }

    const getWishlistProducts = async () => {
        try {
            if (token) {
                const response = await axios.get(backendUrl + '/api/wishlist/get', { headers: { Authorization: `Bearer ${token}` } })
                if (response.data.success) {
                    setWishlistItems(response.data.wishlistItems)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getUser = async () => {
        if (token) {

            try {
                const response = await axios.post(backendUrl + '/api/user/get', {}, { headers: { Authorization: `Bearer ${token}` } })
                if (response.data.success) {
                    setProfileImage(response.data.user.profile)
                    setUserName(response.data.user.name)
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            return null
        }
    }

    const updateUserProfile = async (image) => {
        try {

            if (token) {

                const formData = new FormData();
                formData.append('profileImage', image);

                const response = await axios.put(backendUrl + '/api/user/profile', formData, { headers: { Authorization: `Bearer ${token}` } })
                if (response.data.success) {
                    setProfileImage(response.data.user.profile)
                } else {
                    console.log(response.data.message);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateUserName = async (name) => {
        try {
            if (token) {
                const response = await axios.put(backendUrl + '/api/user/username', { name }, { headers: { Authorization: `Bearer ${token}` } })
                if (response.data.success) {
                    getUser()
                    setUserName(response.data.user.name)
                }
            }
        } catch (error) {
            console.log(response.data.message);
        }
    }

    const addRatings = async (star, ratingText, image, description, productType, itemId,) => {
        try {
            if (token) {
                const formData = new FormData()
                formData.append("star", star)
                formData.append("ratingText", ratingText)
                formData.append("image", image)
                formData.append("productType", productType)
                formData.append("itemId", itemId)
                formData.append("description", description)
                formData.append("userName", userName)
                formData.append("userProfile", profileImage)

                console.log(formData);


                const response = await axios.post(backendUrl + '/api/product/ratings', formData, { headers: { Authorization: `Bearer ${token}` } })

                console.log(response.data);

            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setToken(localStorage.getItem("token"))
        setAdminToken(localStorage.getItem("adminToken"))
        fetchAllProducts()
        getUserCart(localStorage.getItem("token"))
        getWishlistProducts()
        getOrderItems()
    }, [])

    const value = {
        setSearch,
        search, searchExpand,
        setSearchExpand,
        addTocart,
        getCartCount,
        cartItems,
        updateCartItems,
        getTotalCartAmount,
        getTotalCartDiscount,
        addToWIshlist,
        wishlistItems,
        allProducts,
        fetchAllProducts,
        backendUrl,
        token,
        setToken,
        getUserCart,
        getTotalamount,
        profileImage,
        userName,
        updateUserProfile,
        updateUserName,
        addRatings,
        adminToken,
        setAdminToken,
        orderItems,
        setCartItems,
        loading
    }

    useEffect(() => {
        updateUserProfile(assets.mobile)
    }, [token])

    useEffect(() => {
        getTotalCartAmount()
        getTotalCartDiscount()
    }, [cartItems, allProducts])

    useEffect(() => {
        getWishlistProducts()
        getUser()
        getOrderItems()
    }, [token])

    useEffect(() => {
        console.log(loading);

    }, [loading])

    return (
        <shopContext.Provider value={value}>
            {props.children}
        </shopContext.Provider>
    )
}

export default shopContextProvider