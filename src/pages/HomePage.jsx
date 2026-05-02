import React, { useEffect, useState } from 'react'
import Menubar from '../elements/menubar'
import Menus from '../elements/Menus'
import { Link } from 'react-router-dom'

function HomePage() {
    const [menuJson, setMenuJson] = useState()
    const [loading, setLoading] = useState(true)
    const [whatHover, setWhatHover] = useState(-1) // [bool, 무슨 버튼]
    const [whatKind, setWhatKind] = useState(-1) // '무슨 버튼' 한 번 더 누르면 ''
    useEffect(()=>{
        const getMenuJson = async() => {
            const res = await (await fetch(`${import.meta.env.BASE_URL}menus.json`)).json()
            setMenuJson(res)
            console.log("res(menuJson)는?")
            console.log(res) // 성공!!!!
            
            return res
        }

        getMenuJson()
        
    },[])
    

    return (
        <div className="kiosk-page">
            <Link className="jangpage-link" to='/jangpage'>장바구니 가기</Link>

            <div className="kiosk-shell">
                <Menubar 
                    setWhatHover={setWhatHover}
                    setWhatKind={setWhatKind}
                    whatKind={whatKind}
                    menuJson={menuJson}
                    loading={loading}
                    setLoading={setLoading}
                />

                <hr className="kiosk-divider"/>

                <Menus
                    whatHover={whatHover}
                    whatKind={whatKind}
                    menuJson={menuJson} 
                />
            </div>
        </div>
    )
}

export default HomePage