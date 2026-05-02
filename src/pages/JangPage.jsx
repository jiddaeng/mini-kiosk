import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'

function JangPage() {
    const navigate = useNavigate()
    const [jangAll, setJangAll] = useState([])
    const [realJang, setRealJang] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['myJangbaguni'])


    useEffect(()=>{
        setJangAll(cookies.myJangbaguni || [])
    }, [cookies])
    useEffect(()=>{
        console.log(jangAll)
        const counts = jangAll.reduce((acc, item) => {
            const key = item.menuName;
            if (!acc[key]) {
                acc[key] = { menuName: item.menuName, price: item.price, count: 0 };
            }
            acc[key].count += 1;
            return acc;
        }, {});

        
        setRealJang(Object.values(counts))
        console.log(realJang)
    }, [jangAll])
    



    const decreaseItem = (itemName) => {
    const newList = [...cookies.myJangbaguni];
    const targetIndex = newList.findIndex(item => item.menuName === itemName);
    
    if (targetIndex > -1) {
        newList.splice(targetIndex, 1);
        setCookie('myJangbaguni', newList, { path: '/' });
    }
    };

    const increaseItem = (itemName, price) => {
    const newList = [...cookies.myJangbaguni, { menuName: itemName, price: price }];
    setCookie('myJangbaguni', newList, { path: '/' });
    };

    const totalAmount = realJang.reduce((sum, item) => sum + item.price * item.count, 0)

    const openPurchaseModal = () => {
        if (realJang.length > 0) {
            setIsModalOpen(true)
        }
    }

    const handlePurchase = () => {
        setCookie('myJangbaguni', [], { path: '/' })
        setIsModalOpen(false)
        navigate('/successpurchasepage')
    }

    return (
        <div className="jangpage-page">
            <button className="jangpage-purchase-button" onClick={openPurchaseModal} disabled={realJang.length === 0}>
                구매
            </button>
            <div className="jangpage-shell">
                <header className="jangpage-header">
                    <h1 className="jangpage-title">장바구니</h1>
                    <Link className="jangpage-back" to='/'>홈페이지로 돌아가기</Link>
                </header>

                {realJang.length === 0 ? (
                    <div className="jangpage-empty">장바구니가 비어 있습니다.</div>
                ) : (
                    <div className="jangpage-list">
                        {realJang.map((item) => (
                            <div className="jangpage-item" key={item.menuName}>
                                <div className="jangpage-item-meta">
                                    <p className="jangpage-item-label">{item.menuName}({item.price}원)</p>
                                </div>
                                <p className="jangpage-item-count">{item.count}개</p>
                                <div className="jangpage-item-actions">
                                    <button className="jangpage-button" onClick={()=>{increaseItem(item.menuName, item.price)}}>증가</button>
                                    <button className="jangpage-button" onClick={()=>{decreaseItem(item.menuName)}}>감소</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="jangpage-modal-backdrop">
                    <div className="jangpage-modal">
                        <div className="jangpage-modal-header">구매 확인</div>
                        <div className="jangpage-modal-list">
                            {realJang.map((item) => (
                                <div className="jangpage-modal-item" key={item.menuName}>
                                    <span>{item.menuName}</span>
                                    <span>{item.price}원</span>
                                    <span>{item.count}개</span>
                                </div>
                            ))}
                        </div>
                        <div className="jangpage-modal-total">총 금액: {totalAmount}원</div>
                        <div className="jangpage-modal-actions">
                            <button className="jangpage-button jangpage-modal-confirm" onClick={handlePurchase}>구매</button>
                            <button className="jangpage-button jangpage-modal-cancel" onClick={()=>setIsModalOpen(false)}>취소</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default JangPage