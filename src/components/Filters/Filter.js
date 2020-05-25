import React from 'react'

import {
    Select
} from 'antd';


const StateFilter = ({
            options, placeholder, onChange
        }
 
) => {
  return (

                  <Select
                    mode="multiple"
                    style={{ flex: '1 1 80%' }}
                    onChange={onChange}
                    placeholder={placeholder} options={options.map(state => 
                 (
                    {
                        label: state.fieldValue,
                        value: state.fieldValue,
                        key: state.fieldValue
                    }
                 )
        
              
              )} />

    
            

)}

export default StateFilter

