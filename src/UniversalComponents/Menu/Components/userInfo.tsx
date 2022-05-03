import React, { useState } from "react";
import { AUTHURL } from "../../../Configuration/global";
import { useKeycloak } from "@react-keycloak/web";
interface Props {
	logout: () => void;
	userName: string;
}

export default function UserInfo(props: Props) {
	let { logout, userName } = props;
	const { keycloak, initialized } = useKeycloak();
	const [isActive, setActive] = useState(false);
	return (
		<div
			className={"generic-web-menu-item mr-3"}
			onClick={() => setActive(isActive ? false : true)}
		>
			{!!keycloak.authenticated && (
				<>
					<img
						alt="org-icon"
						src="/static_images/user-me-icon-active.svg"
					/>
					<br />
					Me&nbsp;
					<i className="fas fa-angle-down" aria-hidden="true" />
					{isActive && (
						<div className="detail-container">
							{/* <a href={AUTHURL.replace('auth', 'me')} target="_blank" rel="noopener noreferrer">
                        <p>Account</p>
                    </a> */}

							<p
								className="dropdown-signout"
								onClick={() => {
									keycloak.logout();
									logout();
								}}
							>
								Sign Out
							</p>

							{/* <p  onClick={() => logout()}>
						Sign Out
					</p> */}
						</div>
					)}
				</>
			)}
		</div>
	);
}
