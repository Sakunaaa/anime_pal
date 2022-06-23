import React from 'react';

// title, description, imageSrc
export const Card = (props) => {
	return (
		<div>
			{props.isHighlighted && <h1>!</h1>}
			<h2>{props.title}</h2>
			<img width={"100%"} src={props.imageSrc} alt={props.title}/>
			<p>{props.description}</p>
		</div>
	);
};
