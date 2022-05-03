import React from "react";
import { getLocalStorage } from "../../Authentication/Actions/authentication";
const Home = () => {
	return (
		<div>
			<h1>Homepage</h1>
			<b>ACCESS TOKEN</b>
			<p>{getLocalStorage("accessToken")}</p>
			<b>REFRESH TOKEN</b>
			<p>{getLocalStorage("refreshToken")}</p>
		</div>
	);
};

export default Home;
