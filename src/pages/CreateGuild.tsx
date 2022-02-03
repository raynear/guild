import React, { useState } from 'react';

const About = () => {
	const [name, setName] = useState('');

	const onChangeName = (e:any) => {
		setName(e.target.value);
	  };

    return (
		<div>
			<h2>test</h2>
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

export default About;