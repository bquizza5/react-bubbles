import React, { useState } from "react";
import axiosWithAuth from '../util/axiosWithAuth'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res)
        // console.log([colors.filter(color => color.id !== colorToEdit.id))
        let newList = colors.filter(color => color.id !== colorToEdit.id)
        newList.push(colorToEdit)
        updateColors(newList)
        
      
      })
      .catch(err => {console.log(err)});
    setEditing(false)
    
  };

  const deleteColor = (e, color1) => {
    // make a delete request to delete this color
    e.stopPropagation()
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color1.id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
      // console.log(colors.filter(color => color.id !== color1.id))
    updateColors(colors.filter(color => color.id !== color1.id))
    
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>


        {colors? colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={(event) => deleteColor(event, color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        )) : <h2>loading...</h2>}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
