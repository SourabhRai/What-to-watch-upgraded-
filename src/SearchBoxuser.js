import React from 'react';

const SearchBoxuser = (props) => {
	return (
		<div className='col col-sm-4'>
			<input
				className='form-control'
				value={props.value}
				onChange={(event) => props.setSearchUser(event.target.value)}
				placeholder='Search any user ..'
			></input>
		</div>
	);
};

export default SearchBoxuser;
