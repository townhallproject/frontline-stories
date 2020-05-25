import React from 'react'
import { kebabCase } from 'lodash'


import {
    Select
} from 'antd';

// import 'antd/dist/antd.compact.less'
// import 'antd/lib/style/css';
const {
    Option
} = Select;

const StateFilter = ({states}
 
) => {
    console.log(states)
  return (

                  <Select placeholder='State' fluid multiple selection options={states.map(state => 
                 (
                    {
                        label: state.fieldValue,
                        value: kebabCase(state.fieldValue),
                        key: state.fieldValue
                    }
                 )
        
              
              )} />

    
            

)}

export default StateFilter

