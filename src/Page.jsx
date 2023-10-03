import React from 'react';
import styles from './Page.scss';
import * as ReactDOM from "react-dom";

function Page(props) {

	return (
		<>
			<div className={styles.content}>
				Page Content
			</div>
		</>
	);
}

ReactDOM.render(<Page/>, document.getElementsByTagName('div')[0]);
