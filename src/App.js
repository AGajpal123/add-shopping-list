import React, { useState, useEffect } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

const App = () => {
	//added a comment
	// HINT: each "item" in our list names a name, a boolean to tell if its been completed, and a quantity
	const [items, setItems] = useState([
		{
			itemName: "Item 1",
			quantity: 1,
			isSelected: false
		},
		{
			itemName: "Item 2",
			quantity: 2,
			isSelected: true
		},
		{
			itemName: "Item 3",
			quantity: 3,
			isSelected: false
		}
	]);

	useEffect(()=>{
		calculateTotal();
	},[])

	const [inputValue, setInputVal] = useState("");

	const [totalItems, setTotalItems] = useState(0);

	const addItem = () => {
		const newItem = {
			itemName: inputValue,
			quantity: 1,
			isSelected: false
		}
		//...items = copying items
		const newItems = [...items, newItem];
		setItems(newItems);
		
		setInputVal("");
        calculateTotal();
	}



	const handleIncreaseQty = (index) => {
		const newItems = [...items];
		newItems[index].quantity++;
		setItems(newItems);
		calculateTotal();
		
	}

	const handleDecreaseQty = (index) => {
		const newItems = [...items];
		if(newItems[index].quantity!=0){
			newItems[index].quantity--;
			setItems(newItems);
			calculateTotal();
		}
		
	}

	const toggleComplete = (index) => {
		const newItems = [...items];
		newItems[index].isSelected = !newItems[index].isSelected;
		setItems(newItems);
		calculateTotal();
	}

	const calculateTotal = ()=>{
	 const totalItemCount =	items.reduce((total,item)=>{
		 return	total = total + item.quantity;
		},0);
		setTotalItems(totalItemCount);
		
	}
	

	return (
		<div className='app-background'>
			<div className='main-container'>
				<div className='add-item-box'>
					<input className='add-item-input' placeholder='Add an item...' value={inputValue} onChange={(e) => setInputVal(e.target.value)} />
					<FontAwesomeIcon icon={faPlus} onClick={addItem} />
				</div>
				<div className='item-list'>
					{
						items.map((item, index) => (
							<div className='item-container'>
								<div className='item-name' onClick={() => toggleComplete(index)}>
									{/* HINT: replace false with a boolean indicating the item has been completed or not */}
									{item.isSelected ? (
										<>
											<FontAwesomeIcon icon={faCheckCircle} />
											<span className='completed'>{item.itemName}</span>
										</>
									) : (
										<>
											<FontAwesomeIcon icon={faCircle} />
											<span>{item.itemName}</span>
										</>
									)}
								</div>
								<div className='quantity'>
									<button onClick={() => handleDecreaseQty(index)}>
										<FontAwesomeIcon icon={faChevronLeft} />
									</button>
									<span> {item.quantity} </span>
									<button onClick={() => handleIncreaseQty(index)}>
										<FontAwesomeIcon icon={faChevronRight} />
									</button>
								</div>
							</div>
						))
					}

				</div>
				<div className='total'>Total: {totalItems}</div>
			</div>
		</div>
	);
};

export default App;
