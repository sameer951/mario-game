import React, { useEffect, useRef, useState } from "react"
import { BoardPosition } from "./board-position.component";

const throttling = (() => {
    var isActive = true;
    return (fn, delay = 100) => {
        if (isActive) {
            fn();
            setTimeout(() => { isActive = true; }, delay);
            isActive = false;
        }
    }
})();
export const BoardComponet = (props) => {

    // "61", "64", "66", "69", "72", "80", 
    const msrList = ["05", "10", "19", "21", "34", "42", "47", "85", "93", "98"];
    const [state, setState] = useState({ marioPos: '06', mushroomList: msrList });
    const [willAdd, setWillAdd] = useState(false);
    // const [count, setCount] = useState(-1);
    const countNo = useRef(0);
    let count = countNo.current;
    const downHandler = (e) => {
        let i = state.marioPos.charAt(0),
            j = state.marioPos.charAt(1);
        if (e.key === 'ArrowDown' && props.row - 1 > i) { i++; }
        else if (e.key === 'ArrowUp' && i > 0) { i--; }
        else if (e.key === 'ArrowLeft' && j > 0) { j--; }
        else if (e.key === 'ArrowRight' && props.column - 1 > j) { j++; }

        let pos = '' + i + j;
        if (state.marioPos != pos) {
            throttling(() => {
                let mushroomList = state.mushroomList.filter((mushroom) => mushroom != pos);
                let value = { ...state, marioPos: pos, mushroomList };
                setState(value);
            }, 50);

        } else if (e.key === 'e' || e.key === 'E') {
            setWillAdd(true);
        } else if (e.key === 'd' || e.key === 'D') {
            setWillAdd(false);
        }

        // console.log(e);
    }

    useEffect(() => {
        window.addEventListener("keydown", downHandler);
        return () => {
            window.removeEventListener("keydown", downHandler);
        };
    });

    //onMount
    useEffect(() => {
        let pos = '' + +(-1 + Math.floor(props.row / 2)) + +(-1 + Math.floor(props.column / 2));
        let value = { ...state, marioPos: pos };
        setState(value);
        countNo.current = 1;
        // alert(value)
    }, [props.row, props.column]);
    useEffect(() => {
        if (!state.mushroomList.length) {
            alert('You Finished All By Steps: ' + count);
        } else {
            countNo.current = count + 1;
            // setCount(c => c + 1);
        }

    }, [state.marioPos])

    const addMushroom = (id) => {
        if (willAdd && !state.mushroomList.includes(id)) {
            let mushroomList = [...state.mushroomList, id];
            console.log(mushroomList);
            let value = { ...state, mushroomList };
            setState(value);
        }
    }

    let rowList = [];
    for (let i = 0; i < props.row; i++) {
        let columnList = [];
        for (let j = 0; j < props.column; j++) {
            let idpos = '' + i + j;
            columnList.push(<BoardPosition key={`${idpos}`} id={idpos} isMario={idpos + '' == state.marioPos}
                isMushroom={state.mushroomList.includes(idpos)} onAddMushroom={addMushroom}></BoardPosition>);
        }
        rowList.push(<div className="box-row" key={i + 'row'}>{columnList}</div>);
    }
    const clickHandler = (type) => {
        let e = { key: type }
        downHandler(e);
    }
    return (<React.Fragment>
        {rowList}
        <div >
            <div className="float-right">Steps Moved=&gt; {!state.mushroomList.length && count ? count : count ? count - 1 : 0}</div>
            &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<div className="btn btn-primary" onClick={() => clickHandler('ArrowUp')}><i className="arrow up"></i></div><br /><br />
            <div className="btn btn-primary" onClick={() => clickHandler('ArrowLeft')}><i className="arrow left"></i></div> &nbsp;&nbsp;
            <div className="btn btn-primary" onClick={() => clickHandler('ArrowRight')}><i className="arrow right"></i></div><br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div className="btn btn-primary" onClick={() => clickHandler('ArrowDown')}><i className="arrow down"></i></div>
        </div>
    </React.Fragment>);

}
