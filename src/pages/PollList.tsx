import React, { useState } from 'react';

const PollList = () => {
	const [name, setName] = useState('');

	const onChangeName = (e:any) => {
		setName(e.target.value);
	  };

    return (
		<div>
			<h2>poll list</h2>
			<div>
        		<input value={name} onChange={onChangeName} />
      		</div>
			<div>
				<h2>
					홈 : {name}
				</h2>
			</div>
		</div>
    );
};

export default PollList;