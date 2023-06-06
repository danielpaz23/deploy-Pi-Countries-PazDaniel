import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getAct } from "../../redux/actions.js";
import style from "./Form.module.css"
import axios from "axios";
const Form = () => {
    const dispatch = useDispatch();
    const activities = useSelector((state) => state.activities);
    const countries = useSelector((state) => state.countries);

    const [form, setForm] = useState({
        name: "",
        difficulty: "",
        season: "",
        countries: [],
    });
    const [errors, setErrors] = useState({
        name: "",
        difficulty: "",
        season: "",
        countries: [],
    });

    useEffect(() => {
        dispatch(getCountries());
        dispatch(getAct())
    }, [dispatch]);

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        const updatedForm = { ...form, [property]: value };
        setForm(updatedForm);
        setErrors(validate(updatedForm))
    };

    const validate = (form) => {
        let errores = {}
        if (!form.name) {
            errores.name = "Enter a name!";
        } else if (!form.name.match(/^[A-Za-z]+$/)) {
            errores.name= "Name is wrong!";
        } else if (activities.some((activity) => activity.name === form.name)) {
            errores.name= "The name is already in use!";
        } else if (form.name.match(/^[A-Za-z]+$/)) {
            errores.name=  "";
        }
        if (!form.difficulty) {
            errores.difficulty= "Enter a difficulty!";
        }
        if (form.difficulty) {
            errores.difficulty= "" ;
        }
        if (form.season) {
            errores.season= "";
        }
        if (!form.season) {
            errores.season="Enter a season!";
        }
        if (form.countries.length === 0) {
            errores.countries="Select a country!";
        }
        if (form.countries.length > 0) {
            errores.countries="";
        }
        return errores
    }

    const countrySelectionHandler = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions);
        const selectedCountries = selectedOptions.map((option) => option.value);
        setErrors(validate({
                ...form,
                countries: selectedCountries,
            }))
        setForm({
            ...form,
            countries: selectedCountries,
        });
    }
    const submitHandler = async (event) => {
        event.preventDefault();
        if (!form.difficulty) {
            return alert("Enter a difficulty!")
        } else if (!form.season) {
            return alert("Enter a season!")
        } else if (form.countries.length === 0) {
            return alert("Select a country!")
        } else if (!form.name) {
            return alert("Enter a name!")
        } else if (!form.name.match(/^[A-Za-z]+$/)) {
            return alert("Name is wrong!")
        } else if (activities.some((activity) => activity.name === form.name)) {
            return alert("The name is already in use!");
        }
        await axios.post("http://localhost:3001/activities/", form);
        alert("Activity created!!")
        setErrors({
            name: "",
            difficulty: "",
            season: "",
            countries: [],
        })
        setForm({
            name: "",
            difficulty: "",
            season: "",
            countries: [],
        })
    };
    return (
        <form onSubmit={submitHandler} >
            <div className={style.divreset}>
                <h2>Create Activity</h2>
                <div className={style.box1}>
                    <div className={style.box4}>
                        <div className={style.box4d}>
                            <label>Name: </label>
                            <input
                                className={style.links}
                                type="text"
                                value={form.name}
                                onChange={changeHandler}
                                name="name"
                            />
                        </div>
                        <div className={style.box4e}>
                            {errors.name && <span className={style.error}>{errors.name}</span>}
                        </div>
                    </div>
                    <div className={style.box2}>
                        <div className={style.box2a}>
                            <label>Difficulty:</label>
                            <div className={style.box2d}>
                                <text> {form.difficulty}</text>
                            </div>
                            <div className={style.box2b}>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <button
                                        key={value}
                                        type="button"
                                        value={value}
                                        class={
                                            form.difficulty === String(value)
                                                ? "selected"
                                                : ""
                                        }
                                        onClick={changeHandler}
                                        name="difficulty"
                                    >
                                        {value}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className={style.box2e}>
                            {errors.difficulty && <span className={style.error}>{errors.difficulty}</span>}
                        </div>
                    </div>
                    <div className={style.box3}>
                        <div className={style.box3a}>
                            <label>Season:</label>
                            <div className={style.box3c}>
                                <div className={style.box3d}>
                                    <text>{form.season}</text>
                                </div>
                                <div className={style.box3b}>
                                    {['Summer', 'Autumn', 'Winter', 'Spring'].map(
                                        (season) => (
                                            <button
                                                key={season}
                                                type="button"
                                                onClick={changeHandler}
                                                value={season}
                                                name="season"
                                                class={
                                                    form.season === season ? "selected" : ""
                                                }
                                            >
                                                {season}
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={style.box3e}>
                            {errors.season && <span className={style.error}>{errors.season}</span>}
                        </div>
                    </div>
                </div>
                <div className={style.box5}>
                    <div className={style.box6}>
                        <button className={style.links} type="submit">SUBMIT</button>
                    </div>
                    <div className={style.box7}>
                        <label>Select a countries:{errors.countries && <span className={style.error}>{errors.countries}</span>}</label>
                        <select
                            className={style.select}
                            name="countries"
                            onChange={countrySelectionHandler}
                            multiple
                        >
                            {countries.map((op) => (
                                <option key={op.id} value={op.id}>
                                    {op.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </form>
    );
};
export default Form;