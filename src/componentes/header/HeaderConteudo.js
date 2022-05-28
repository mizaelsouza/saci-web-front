import { faCompress, faList, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function HeaderConteudo({ btnSideBar, onCloseUsers, onFullScreen }) {
    return (
        <nav className="navbar navbar-default bg-light">
            <div className="container-fluid">
                <div className="navbar-header">
                    <div className="navbar-icons-header" onClick={btnSideBar}>
                        <FontAwesomeIcon icon={faList} size='lg' />
                    </div>
                    <div className="navbar-icons-header_iconsR">
                        <FontAwesomeIcon onClick={onFullScreen} className="btn-full" icon={faCompress} size='lg' />
                        <FontAwesomeIcon onClick={onCloseUsers} className="btn-off" icon={faPowerOff} size='lg' />
                    </div>
                </div>
            </div>
        </nav>

    )
}