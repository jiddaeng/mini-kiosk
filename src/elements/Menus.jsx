import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

// isHover랑 menuJson, whatBtn 넘기면 될 듯

function Menus({ whatHover, whatKind, menuJson }) {
    const [displayMenu, setDisplayMenu] = useState(-1)
    const [cookies, setCookie] = useCookies(['myJangbaguni'])

    const purchaseItem = (item) => {
        const prevList = cookies.myJangbaguni || []
        const newList = [...prevList, { menuName: item.menuName, price: item.price }]
        setCookie('myJangbaguni', newList, { path : '/' }) //얘가 알아서 stringify랑 parse해줌
    }

    useEffect(()=>{
        if (whatKind===-1) {
            setDisplayMenu(whatHover)
        } else {
            setDisplayMenu(whatKind)
        }
    }, [whatHover, whatKind])
    return (
        <div className="menus-panel">
            <span className="screen-reader-only">메뉴 목록</span>
            {/* <p>hover : {whatHover}</p>
            <p>click : {whatKind}</p>
            <p>displayMenu : {displayMenu}</p> */}
            {
                (displayMenu === -1) ? <div className="menu-empty">아직 없음</div> : (
                    <div className="menu-grid">
                        {menuJson[displayMenu]?.menu.map((item, index)=>(
                            <article className="menu-item-card" key={item.id}>
                                <div className="menu-item-photo">
                                    <img src={item.img} alt={item.menuName} className="menu-item-picture" />
                                </div>
                                <div className="menu-item-meta">
                                    <span className="menu-item-name">{item.menuName}</span>
                                    <div className="menu-item-info">
                                        <span className="menu-item-price">{item.price}원</span>
                                        <span className="menu-item-stock">{(item.soldout==="True")?"다 팔림":"재고 남음"}</span>
                                    </div>
                                </div>
                                <button 
                                    className={item.soldout === "True" ? "menu-item-button menu-item-button--disabled" : "menu-item-button"}
                                    onClick={()=>{purchaseItem(item)}}
                                    disabled={item.soldout === "True"}
                                >
                                    장바구니 담기
                                </button>
                            </article>
                        ))}
                    </div>
                )
            }
        </div>
    )
}

export default Menus