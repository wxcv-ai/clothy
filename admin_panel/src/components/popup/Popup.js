import "./PopUp.css" ;
import { useEffect , useState } from "react";
import { couldStartTrivia } from "typescript";
import axios from 'axios';

export default function Popup(props) {

    /*


    "other_detail": [
      {
          "red": {44:100 ,41:2 , 39:2}
      },
      {
          "green": {44:23 ,41:0 , 39:212}
      },
      {

          "yellow": {44:3 ,41:2520 , 39:0}
      }
  ] ,
  "other_detail_Quantity": [
    {
        "red": 122
    },
    {
        "green": 15
    },
    {
        "yellow": 0 
    }
]
    */
    const [size_arr , Setsize_arr] = useState([]) ; 
    const [size_arr_length , Setsize_arr_length ] = useState(0) ; 
    const [data_json , Setdata_json] = useState({}) ; 

    const [tmp_stg , Settmp_stg] = useState({}) ;
    const [tmp_stg_qty , Settmp_stg_qty] = useState({}) ;
    const [btn_change , Set_btn_change] = useState({}) ;
    
    const [color_arr , Setcolor_arr] = useState([
        {
            "red": {44:100 ,41:2 , 39:2}
        },
        {
            "green": {44:23 ,41:0 , 39:212}
        },
        {
          
            "yellow": {"*":3 }
        }

    ]) ; 

    const [color_arr_length , Setcolor_arr_length ] = useState(0) ; 

    const [colorsAndSizes , SetcolorsAndSizes ] = useState({}) ; 


    
    const update_tmp_stg = ((size,color , value) => {

        let tempo_json ={} ;
        Object.assign(tempo_json, tmp_stg);
        tempo_json[color.toString()+"_"+size.toString()] = value ; 
        Settmp_stg(tempo_json) ;
        return 0 ; 
    })
    const update_tmp_stg_qty = ((size,color , value) => {
        let tempo_json ={} ;
        Object.assign(tempo_json, tmp_stg_qty);
        tempo_json[color.toString()+"_"+size.toString()] = value ; 

        Settmp_stg_qty(tempo_json) ;

        return 0 ; 
    })
    const delete_color = ((key)=>{
        let temp_size_arr = [] ;
        var new_json= {} ;
        for (let i =0 ; i< color_arr.length ; i++) {
            if (i !== key) {
                temp_size_arr.push(color_arr[i])
            }
        }

 

        Setcolor_arr(temp_size_arr)
        Setcolor_arr_length(color_arr_length-1)
        return 0 ;
    })
    const add_color =((added_item)=>{
        var temp_color =  [...color_arr ];
        var status = false ; 
        for (let i=0 ; i< temp_color.length ; i++) {
            if (Object.keys(temp_color[i])[0] == added_item) {  status = true ;  }
        }
        if(status == false) {
            temp_color.push( {"/":{"":""}})
        }

        Setcolor_arr(temp_color) ; 

        
        return 0 ;
    })
    const update_color = ((new_val , color)=>{
        var temp_color =  [...color_arr ];

        var final_temp = [] ; 
        for (let i=0 ; i< temp_color.length ; i++) {
            if (Object.keys(temp_color[i])[0] == color)
                { 
                    let new_dict_part  = {} ;
                    new_dict_part[new_val] =  temp_color[i][color]  ; 
                    final_temp.push(new_dict_part) ;
                }
            else {
                final_temp.push(temp_color[i] ) ;

            }
        }


        Setcolor_arr(final_temp) ; 
        return 0 ; 
    })

    const update_global_size = ((new_val , color)=>{

        var temp_color =  [...color_arr ];

        var final_temp = [] ; 
        for (let i=0 ; i< temp_color.length ; i++) {
            if (Object.keys(temp_color[i])[0] == color)
                { 
                    let new_dict_part  = {} ;
                    new_dict_part[color] =  {'*' : new_val} ; 
                    final_temp.push(new_dict_part) ;
                }
            else {
                final_temp.push(temp_color[i] ) ;

            }
        }

        Setcolor_arr(final_temp) ; 
        return 0 ; 
    })
    const delete_size = ((key_of_size,color)=>{
        var temp_color =  [...color_arr ];
        var final_temp = [] ; 
        var parm_idx = -1 ; 
        let new_param ;
        for (let i=0 ; i< temp_color.length ; i++) {
            if (Object.keys(temp_color[i])[0] == color)
                { 
                    parm_idx = i ;
                    var size_dict = (temp_color[i])[Object.keys(temp_color[i])[0]]
                    delete size_dict[key_of_size]
                    new_param = size_dict ; 
                    break 
                }
        }
        if (parm_idx !== -1) {
            (temp_color[parm_idx])[Object.keys(temp_color[parm_idx])[0]] = new_param
        }

        Setcolor_arr(temp_color) ;
        return 0 ;
    })
    const  add_size =((color)=>{
        var temp_color =  [...color_arr ];
        var parm_idx = -1 ; 
        let new_param ;
        for (let i=0 ; i< temp_color.length ; i++) {
            if (Object.keys(temp_color[i])[0] == color)
                { 
                    parm_idx = i ;
                    var size_dict = (temp_color[i])[Object.keys(temp_color[i])[0]]


                    size_dict["/"]=""
                    new_param = size_dict ; 
                    break 
                }
    
        }
        if (parm_idx !== -1) {
            (temp_color[parm_idx])[Object.keys(temp_color[parm_idx])[0]] = new_param
            let tempo_json ={} ;
            let tempo_json2 ={} ;
            Object.assign(tempo_json, tmp_stg);
            Object.assign(tempo_json2, tmp_stg_qty);
            tempo_json["/"]=""
            tempo_json2["/"]=""
            Settmp_stg(tempo_json)
            Settmp_stg_qty(tempo_json2)

        }
        Setcolor_arr(temp_color) ;
        return 0 ;
    })
    const update_size =((size,color,change_val)=>{
        var temp_color =  [...color_arr ];
        var parm_idx = -1 ; 
        let new_param ;
        for (let i=0 ; i< temp_color.length ; i++) {
            if (Object.keys(temp_color[i])[0] == color)
                { 

                    //size_quantity = 10 ;
                    //change_val  = "test" ; 
                    if (tmp_stg[color.toString()+"_"+size.toString()] != undefined && tmp_stg_qty[color.toString()+"_"+size.toString()] !=undefined) {
                        if (parm_idx == -1  ){
  
                            if(tmp_stg[color.toString()+"_"+size.toString()].length >0) {
                                parm_idx = i ;
                                var size_dict = (temp_color[i])[Object.keys(temp_color[i])[0]]
    
                                var size_quantity = size_dict[size]
                                delete size_dict[size] 


                                size_dict[tmp_stg[color.toString()+"_"+size.toString()]] = tmp_stg_qty[color.toString()+"_"+size.toString()]
                                new_param = size_dict ;                             

                            }                     
                            
                        }
      

                    }
                     
                }

        if (parm_idx !== -1) {

            (temp_color[parm_idx])[Object.keys(temp_color[parm_idx])[0]] = new_param ;


            let tempo_json ={} ;
            let tempo_json_qty ={} ;
            Object.assign(tempo_json_qty, tmp_stg_qty);
            Object.assign(tempo_json, tmp_stg);
            tempo_json_qty[color.toString()+"_/"] = ""
            tempo_json[color.toString()+"_/"] = ""
            
            Settmp_stg(tempo_json);
            Settmp_stg_qty(tempo_json_qty) ;

            Setcolor_arr(temp_color) ;

        }
        
        }
    })
    const all_size_bttons = (()=>{
        var temp_size_arr =  [...size_arr ];
        for (let i =0 ; i< size_arr_length - size_arr.length ; i++) {
            temp_size_arr.push(<div className="one_size" > the size {size_arr_length} </div>)
            Setsize_arr(temp_size_arr) ; 
        }

        return 0 ; 
    })
    const all_color_bttons = (()=>{
        var temp_size_arr =  [...color_arr ];
        for (let i =0 ; i< color_arr_length - color_arr.length ; i++) {
            temp_size_arr.push(<div className="one_size" > the size {color_arr_length} </div>)
            Setcolor_arr(temp_size_arr) ; 
        }

        return 0 ; 
    })

    useEffect (() => {
        all_size_bttons() ; 
        all_color_bttons() ; 
    },[size_arr_length , color_arr_length]) ; 

    useEffect (()=>{
        Setcolor_arr(color_arr) ; 
    },[btn_change]) ; 

    useEffect (() => {
        var new_color_sizes = {}
        //Object.assign(new_color_sizes, colorsAndSizes);

        for (let i =0 ; i < color_arr.length ; i++) {
            var the_color = Object.keys( color_arr[i])[0] ;
            var the_sizes = color_arr[i][the_color] ;



            if (Object.keys(the_sizes).length >0) {
                var all_qty = 0
                for (let j =0 ; j <Object.keys(the_sizes).length ; j++)  {

                    var one_size_name = Object.keys(the_sizes)[j] ;
                    var one_size_qty = the_sizes[one_size_name]
                    if (one_size_name !== "*") {

                        all_qty+= parseFloat(one_size_qty) ;

                    }

                    
                }
                

                if(( Object.keys(colorsAndSizes)).includes(the_color)) {
                    new_color_sizes[the_color] = all_qty ; 

                }
                else {
                    new_color_sizes[the_color] = all_qty ; 

                }   
               // console.log(color_arr  , new_color_sizes , "qty") ; 
             
            }

        }
        SetcolorsAndSizes(new_color_sizes)

    },[color_arr])

    useEffect (() => {
        var new_size_stg = {}
        var new_qty_stg = {}
        //Object.assign(new_color_sizes, colorsAndSizes);

        for (let i =0 ; i < color_arr.length ; i++) {
            var the_color = Object.keys( color_arr[i])[0] ;
            var the_sizes = color_arr[i][the_color] ;
            if (Object.keys(the_sizes).length >0) {

                for (let j =0 ; j <Object.keys(the_sizes).length ; j++)  {

                    var one_size_name = Object.keys(the_sizes)[j] ;
                    var one_size_qty = the_sizes[one_size_name]
                    if (one_size_name !== "*") {

                        new_size_stg[the_color.toString()+"_"+one_size_name.toString()] = one_size_name
                        new_qty_stg[the_color.toString()+"_"+one_size_name.toString()] = one_size_qty

                    }

                    
                }
            }
        }


    },[color_arr])

    function handleChangeMultiples(event) {
        let allFiles = event.target.files
        setMultFiles(event.target.files); 
    }
    const handleFilesnames = (fileDict) =>{
        let fileArray = []
        if (fileDict != undefined){
            for (let i =0 ;i< fileDict.length ; i++){
                
                var filename = fileDict[i].name ;

                fileArray.push(filename) ;


            }
        }


        return (fileArray) ; 
    }
    function handleMultiples(event){
        
        event.preventDefault() ; 
        const url = 'http://localhost:4000/uploadMultiple';
        const formData = new FormData();

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Access-Control-Allow-Origin' : '*'
            },
        };
        if(file != undefined) {
            formData.append('file', file);
            formData.append('fileName', file.name);             
        }

        if (MultFiles != undefined) {
            for (let i = 0 ; i<MultFiles.length ; i++) {
                if (MultFiles[i] != undefined) {
                    var thefile  = MultFiles[i]
                    formData.append('file', thefile);
                    formData.append('fileName', thefile.name);                
                }            
            }

            axios.post(url, formData, config)
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.log("err") ; 
            }) ;

                        
        }


    
    }
    const delete_image = ((the_id)=>{
        var temp_form_data = []
        if (MultFiles != undefined) {
            for (let i = 0 ; i<MultFiles.length ; i++) {
                console.log(i ,  the_id  ,MultFiles )
                if (MultFiles[i] != undefined && i != the_id   ) {
                    var thefile  = MultFiles[i]
                    temp_form_data.push( thefile);
                }            
            }



                        
        }     
        setMultFiles(temp_form_data)
        SetuploadFileShowSFCCArr(handleFilesnames(temp_form_data))
    })



    function get() {
        const url = 'http://localhost:4000/getimages';
        const config = {
            headers: {
                //'content-type': 'multipart/form-data',
                'Content-Type': 'image/jpeg'
            },
        };
        
        let return_data = [] ; 

        axios.get(url, config)
        .then(async (response) => {
            let the_tmp_images = [] ;
            for (let i=0 ; i< (response.data).length ; i++) {

                const blob =  (response.data)[i] ;
                //console.log((response.data)[i])
                the_tmp_images.push((blob)) ;
            }

            return_data =  [the_tmp_images, null];
            //console.log("return_data111111" , return_data) ; 
            return return_data ; 

        })
        .catch((err) => {
            console.log("err8888888888") ; 
            return_data =  [null, err] ; 
            //console.log("return_data222222" , return_data) ; 
            return return_data ; 

        }) ;

    }   
    
    const [screenShot, setScreenshot] = useState(undefined)
    useEffect(() => {
        async function fetchData() {
            // You can await here
            console.log( get() , " get()") ;

            const [response, error] =  get() ; 
            if (error)
                console.log(error)
            else {
                console.log(`got response ${response}`)
            
            setScreenshot(response) ; 

        }
        }
        fetchData();
    }, [])
    
 
    console.log(screenShot , "screenShot") ;

    const [uploadFileShowSFCCArr, SetuploadFileShowSFCCArr] = useState() ; 
    const [MultFiles, setMultFiles] = useState([]) ; 
    const [file, setFile] = useState() ; 


    //value={colorsAndSizes[Object.keys(the_item)[0]]} 

    return (props.trigger) ? (
        <div className="popup">
                <img src={screenShot} className="Screenshot" alt="showing screen capture" />

            <div className="pop-inner">
                <div  onClick = {()=>{ 
                    props.setTrigger(false);
                    Setsize_arr_length(0) ;
                    Setsize_arr([]) ;
                    Setdata_json({}) ; 
                    }}>X</div>

                <div className="theActualPopup"> 
                        
                <div className="item">
                    <div className="uploadSFCC">Upload the pictures</div>
                    <input className="uploadSfcc"
                        name='file'
                        type="file" 
                        multiple

                        onChange={(e)=>{
                            handleChangeMultiples(e) ;
                            
                            SetuploadFileShowSFCCArr(handleFilesnames(e.target.files) ); 
                        }}/>

                    
                        <button onClick={(e)=>{handleMultiples(e)}}> submit back end</button>
                        <div className="all_images_upload">
                        {
                                (uploadFileShowSFCCArr!== undefined && uploadFileShowSFCCArr!== [] ) && (
                                    uploadFileShowSFCCArr.map((file_item,file_key)=>(
                                        <div className="mult_files"> 
                                            <div  className="del_ONE_PICTURE_upload"  onClick={(e)=>{delete_image(file_key)}}> X </div>

                                            <img  className="ONE_PICTURE_upload" src={URL.createObjectURL(MultFiles[file_key])}/>
                                        </div>
                                    ))                            
                                )

                            }                            
                        </div>
    
                </div>



                <div className="upper_popup_section">
                    <div className="title_section_text">title</div>
                    <input className="title_section"  placeholder = 'title' type="text"/>
                    <div className="description_section_text">description</div>
                    <input className="description_section" placeholder = "description" type="text"/>

                </div>
                <button className="add_one_size" onClick={(e)=>{ add_color("/") }}  > add color</button>
   
                    {
                        color_arr.map((the_item,the_key)=>(
                      
                        <div className="all_colors">
                            <div className="upper_color_detail"> 
                                <div className="color_name">
                                    <div className="title_item">{Object.keys(the_item)[0]}</div>
                                    <input className="input"  onChange={(e)=> {  update_color(e.target.value ,Object.keys(the_item)[0] ) ; }}/>
                                </div>
                                {
                                    (( (Object.keys(the_item[Object.keys(the_item)[0]])).length == 0  || (Object.keys(the_item[Object.keys(the_item)[0]])[0] =="*" && (Object.keys(the_item[Object.keys(the_item)[0]])).length == 1 ) )&& (
                                        <div className="total_quantity"> 
                                            <div className="title_item">  quantity</div>
                                            <input className="input" placeholder=" color quantity"  type="number"     onChange={(e)=> {  update_global_size(e.target.value ,Object.keys(the_item)[0] ) ; }}/>
                                        </div>
                                    )) 
                                }
                                <div className="color_name" > 
                                    <button className="button"  onClick={(e)=>{ delete_color(the_key) }}>  X  </button>
                                </div>
                            </div>
                            <button className="add_one_size" onClick={(e)=>{add_size(Object.keys(the_item)[0])}}  > add size </button>
                            {
                            (Object.keys(the_item[Object.keys(the_item)[0]])).map( (item, key)=> ( 
                                <div className="all_items"> 
                                      {(item !== "*") && (
                                        <div className="items"> 
                                            <div  className="item_details"> 
                                                <div className="the_item_type" > the size {item} </div>
                                                <div className="the_item_qty" > has  {the_item[Object.keys(the_item)[0]][Object.keys(the_item[Object.keys(the_item)[0]])[key]]} copies </div>
                                            </div>
                                            <div className="item_modifications">
                                               {(tmp_stg[Object.keys(the_item)[0].toString()+"_"+(Object.keys(the_item[Object.keys(the_item)[0]])[key]).toString()]  == undefined) &&  (tmp_stg[Object.keys(the_item)[0].toString()+"_"+(Object.keys(the_item[Object.keys(the_item)[0]])[key]).toString()]  = "")}
                                                {(tmp_stg_qty[Object.keys(the_item)[0].toString()+"_"+(Object.keys(the_item[Object.keys(the_item)[0]])[key]).toString()]  == undefined) &&  (tmp_stg_qty[Object.keys(the_item)[0].toString()+"_"+(Object.keys(the_item[Object.keys(the_item)[0]])[key]).toString()]  = "")}
                                                
                                                <input className="input" placeholder="size"   value={tmp_stg[Object.keys(the_item)[0].toString()+"_"+(Object.keys(the_item[Object.keys(the_item)[0]])[key]).toString()] }  
                                                onChange={(e)=>{update_tmp_stg((Object.keys(the_item[Object.keys(the_item)[0]])[key]) , Object.keys(the_item)[0],e.target.value)}} />
                                                
                                                
                                                <input className="input" placeholder="quantity" type="number"  value={tmp_stg_qty[Object.keys(the_item)[0].toString()+"_"+(Object.keys(the_item[Object.keys(the_item)[0]])[key]).toString()] }  
                                                
                                                onChange={(e)=>{update_tmp_stg_qty((Object.keys(the_item[Object.keys(the_item)[0]])[key]) , Object.keys(the_item)[0],e.target.value)}} />
                                                <button onClick={(e)=>{update_size((Object.keys(the_item[Object.keys(the_item)[0]])[key]) , Object.keys(the_item)[0],11258)   , Set_btn_change(!btn_change)}}> confirm </button>
                                                <button  onClick={(e)=>{delete_size((Object.keys(the_item[Object.keys(the_item)[0]])[key]) , Object.keys(the_item)[0]) ; }} >   X</button>                            
                                               
                                            </div>
                                      
                                        </div>
                                    
                                        )}

                                
                                </div>
                            ))
                            }                          
                        </div>
                        ) )
                    }


                </div>
                
            </div>

        </div>
    ) :"" ; 
}



/*

*/