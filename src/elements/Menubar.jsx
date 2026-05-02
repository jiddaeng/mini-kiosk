import React, { useEffect, useState } from 'react'  
import './Menubar.css'

function Menubar({ setWhatHover, whatKind, setWhatKind, menuJson, loading, setLoading }) {
  const [menubar, setMenubar] = useState([])
      const getMenubar = () => {
          setMenubar(menuJson?.map((item, index)=>item.kind) || ['안 들어옴'])
          console.log(menubar)
      }
      const btnClick = (index) => {
        setWhatKind((prevKind) => (prevKind === index ? -1 : index));
      }
      useEffect(()=>{
          getMenubar()
          setLoading(false)
          console.log("로딩?")
          console.log(loading)
      }, [menuJson])
  
      return (
          <div className="menubar-block">
              <span className="screen-reader-only">메뉴 선택</span>
              {
                      (loading) ? (<p className="loading-text">로딩 중</p>) : (
                          <div className='menubar'>
                              {
                                  menubar.map((item, index)=>(
                                      <button key={index}
                                        className={`menubar-button ${whatKind === index ? 'menubar-button--active' : ''}`}
                                        onMouseEnter={()=>{setWhatHover(index)}}
                                        onMouseLeave={()=>{setWhatHover(-1)}}
                                        onClick={()=>{btnClick(index)}}
                                      >
                                          {item}
                                      </button>
                                  ))
                              }
                          </div>
                      ) 
              }
          </div>
          
      )
}

export default Menubar