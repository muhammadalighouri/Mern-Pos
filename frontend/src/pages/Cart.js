import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Header from "../components/Header";
import { toast } from "react-toastify";
import { addToCart, removeCart } from "../Redux/actions/cartActions";
import CustomerForm from "../components/CustomerForm";

export default function Cart() {
    const cartProducts = useSelector((state) => state.Cart.cartItems);
    const userInfo = useSelector((state) => state.User.userInfo);
    const [age, setAge] = React.useState(1);
    const [open, setOpen] = useState();
    const dispatch = useDispatch();
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const total = cartProducts
        .reduce((a, i) => a + i.qty * i.price, 0)
        .toFixed(2);

    const deleteCart = (id) => {
        dispatch(removeCart(id));
    };
    const submitHandler = (e) => {
        e.preventDefault();

        if (userInfo._id) {
            alert('green');
        }
        else {
            setOpen(true);
        }
    }
    return (
        <>
            <Header bg={"#fff"} />
            <CustomerForm open={open} setOpen={setOpen} />
            <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol>
                            <MDBCard>
                                <MDBCardBody className="p-4">
                                    <MDBRow>
                                        <MDBCol lg="7">
                                            <MDBTypography tag="h5">
                                                <Link to={"/menu"} className="text-body">
                                                    {" "}
                                                    Continue shopping
                                                </Link>
                                            </MDBTypography>

                                            <hr />

                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <div>
                                                    <p className="mb-1" style={{ color: "#000" }}>
                                                        Shopping cart
                                                    </p>
                                                    <p className="mb-0" style={{ color: "#000" }}>
                                                        You have {cartProducts.length} items in your cart
                                                    </p>
                                                </div>
                                                <div></div>
                                            </div>

                                            {cartProducts.map((item, ind) => {
                                                return (
                                                    <MDBCard className="mb-3">
                                                        <MDBCardBody>
                                                            <div className="d-flex justify-content-between">
                                                                <div className="d-flex flex-row align-items-center">
                                                                    <div>
                                                                        <MDBCardImage
                                                                            src={item.image}
                                                                            fluid
                                                                            className="rounded-3"
                                                                            style={{ width: "65px" }}
                                                                            alt="Shopping item"
                                                                        />
                                                                    </div>
                                                                    <div className="ms-3">
                                                                        <MDBTypography
                                                                            tag="h5"
                                                                            style={{ color: "#000" }}
                                                                        >
                                                                            {item.title}
                                                                        </MDBTypography>
                                                                        <p
                                                                            className="small mb-0"
                                                                            style={{ color: "#000" }}
                                                                        >
                                                                            {item.description}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex flex-row align-items-center">
                                                                    <div className="quantity">
                                                                        <select
                                                                            value={item.qty}
                                                                            id=""
                                                                            style={{
                                                                                wordWrap: "normal",
                                                                                color: "black",
                                                                                border: "1px solid black",
                                                                                marginRight: "10px",
                                                                                borderRadius: "4px",
                                                                            }}
                                                                            onChange={(e) =>
                                                                                dispatch(
                                                                                    addToCart(
                                                                                        item.product,
                                                                                        Number(e.target.value)
                                                                                    )
                                                                                )
                                                                            }
                                                                        >
                                                                            {[...Array(7).keys()].map((x) => (
                                                                                <option
                                                                                    style={{ color: "black" }}
                                                                                    value={x + 1}
                                                                                    key={x + 1}
                                                                                >
                                                                                    {x + 1}
                                                                                </option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                    <div style={{ width: "80px" }}>
                                                                        <MDBTypography
                                                                            tag="h5"
                                                                            className="mb-0"
                                                                            style={{ color: "#000" }}
                                                                        >
                                                                            {item.price}
                                                                        </MDBTypography>
                                                                    </div>

                                                                    <MDBIcon
                                                                        fas
                                                                        icon="trash-alt"
                                                                        style={{ color: "#000" }}
                                                                        onClick={() => deleteCart(item.product)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </MDBCardBody>
                                                    </MDBCard>
                                                );
                                            })}
                                        </MDBCol>

                                        <MDBCol lg="5">
                                            <MDBCard className="bg-primary text-white rounded-3">
                                                <MDBCardBody>
                                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                                        <MDBTypography tag="h5" className="mb-0">
                                                            Customer details
                                                        </MDBTypography>
                                                        <MDBCardImage
                                                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                                            fluid
                                                            className="rounded-3"
                                                            style={{ width: "45px" }}
                                                            alt="Avatar"
                                                        />
                                                    </div>

                                                    <form className="mt-1">
                                                        <MDBInput
                                                            className="mb-4"
                                                            label=" Name"
                                                            type="text"
                                                            size="lg"
                                                            placeholder=" Name"
                                                            contrast
                                                        />
                                                        <MDBInput
                                                            className="mb-4"
                                                            label="Phone Number"
                                                            type="select"
                                                            size="lg"
                                                            minLength="19"
                                                            maxLength="19"
                                                            placeholder="1234 5678 9012 3457"
                                                            contrast
                                                        />

                                                        <MDBRow className="mb-4">
                                                            <MDBCol md="6">
                                                                <FormControl
                                                                    sx={{ m: 1, minWidth: "100%" }}
                                                                    size="small"
                                                                >
                                                                    <InputLabel
                                                                        id="demo-select-small"
                                                                        style={{ color: "#fff" }}
                                                                    >
                                                                        Service
                                                                    </InputLabel>
                                                                    <Select
                                                                        labelId="demo-select-small"
                                                                        id="demo-select-small"
                                                                        value={age}
                                                                        label="Age"
                                                                        onChange={handleChange}
                                                                    >
                                                                        <MenuItem value={1}>dinning</MenuItem>
                                                                        <MenuItem value={2}>indoor</MenuItem>
                                                                        <MenuItem value={3}>outdoor</MenuItem>
                                                                        <MenuItem value={3}>roof-top</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </MDBCol>
                                                            <MDBCol md="6">
                                                                <FormControl
                                                                    sx={{ m: 1, minWidth: "100%" }}
                                                                    size="small"
                                                                >
                                                                    <InputLabel
                                                                        id="demo-select-small"
                                                                        style={{ color: "#fff" }}
                                                                    >
                                                                        Table No
                                                                    </InputLabel>
                                                                    <Select
                                                                        labelId="demo-select-small"
                                                                        id="demo-select-small"
                                                                        value={age}
                                                                        label="Age"
                                                                        onChange={handleChange}
                                                                    >
                                                                        <MenuItem value={1}>1</MenuItem>
                                                                        <MenuItem value={2}>2</MenuItem>
                                                                        <MenuItem value={3}>3</MenuItem>
                                                                        <MenuItem value={3}>4</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </MDBCol>
                                                        </MDBRow>
                                                        <MDBRow className="mb-4 time__input">
                                                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small" >
                                                                <MDBInput
                                                                    className="mb-4"
                                                                    label="Expected Time"
                                                                    type="time"
                                                                    size="lg"
                                                                    minLength="19"
                                                                    maxLength="19"
                                                                    placeholder="1234 5678 9012 3457"
                                                                    contrast
                                                                />

                                                            </FormControl>

                                                        </MDBRow>
                                                    </form>

                                                    <hr />

                                                    {/* <div className="d-flex justify-content-between">
                                                        <p className="mb-2">Subtotal</p>
                                                        <p className="mb-2">${total}</p>
                                                    </div>

                                                    <div className="d-flex justify-content-between">
                                                        <p className="mb-2">Shipping</p>
                                                        <p className="mb-2">.00</p>
                                                    </div> */}

                                                    <div className="d-flex justify-content-between">
                                                        <p className="mb-2">Total(Incl. taxes)</p>
                                                        <p className="mb-2">{total}</p>
                                                    </div>

                                                    <MDBBtn color="info" block size="lg">
                                                        <div
                                                            className="d-flex justify-content-between"
                                                            onClick={submitHandler}
                                                        >
                                                            <span>{total}.00</span>
                                                            <span>
                                                                Checkout{" "}
                                                                <i className="fas fa-long-arrow-alt-right ms-2"></i>
                                                            </span>
                                                        </div>
                                                    </MDBBtn>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </>
    );
}
