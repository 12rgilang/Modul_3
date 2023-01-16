import { useState, useRef } from "react"
import {Modal, ModalBody} from 'reactstrap';
import axios from "axios";

export default function CreateModal(){

    let name = useRef()
    let price = useRef()
    let stocks = useRef()

    const[modalOpen, setModalOpen] = useState(false)
    const[message, setMessage] = useState('')
    const[selectedImages, setSelectedImages] = useState([])

    let onImagesValidation = (e) => {
        try {
            let files = [...e.target.files] // [{}, {}, {}]

            // Validasi total file
            if(files.length > 3) throw { message: 'Select 3 Images or Less!' }
            
            // Validasi filesize 
            files.forEach((value) => {
                if(value.size > 100000) throw { message: `${value.name} more than 100Kb` }
            })

            setSelectedImages(files)
            setMessage('')
        } catch (error) {
            setMessage(error.message)
        }
    }

    let onSubmit = async() => {
        try {
            // Step-1 Ambil inputan dari user
            let inputName = name.current.value 
            let inputPrice = price.current.value 
            let inputStocks = stocks.current.value 
            
            let fd = new FormData()
            fd.append('data', JSON.stringify({name: inputName, price: inputPrice, stocks: inputStocks}))
            selectedImages.forEach(value => {
                fd.append('images', value)
            })
            
            await axios.post(`http://localhost:5000/products/create`, fd)
            
            alert('Upload Success')
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
            <input type="button" value="Insert Product" onClick={() => setModalOpen(true)} className="btn btn-primary rounded-0" />
            <Modal toggle={() => setModalOpen(false)} isOpen={modalOpen}>
                <ModalBody>
                    <div className="text-center px-3 py-3">
                        <h3>
                            Insert Product
                        </h3>
                    </div>
                    <div className="px-3 py-3">
                        <h6>Product Name :</h6>
                        <input type="text" ref={name} className="form-control" />
                    </div>
                    <div className="px-3 py-3">
                        <h6>Price :</h6>
                        <input type="text" ref={price} className="form-control" />
                    </div>
                    <div className="px-3 py-3">
                        <h6>Stock :</h6>
                        <input type="text" ref={stocks} className="form-control" />
                    </div>
                    <div className="px-3 pt-3">
                        <h6>Select Images :</h6>
                    </div>
                    <div className="row border mx-3 px-3 py-3 rounded">
                        <div className="col-12">
                            <div>
                                <input type="file" accept="image/*" multiple onChange={(e) => onImagesValidation(e)} />
                                {/* <input type="button" value="Choose File" onClick={() => this.files.click()} className="btn btn-warning" /> */}
                            </div>
                        </div>
                    </div>
                    <div>
                        {message}
                    </div>
                    <div className="my-3 px-3 py-3">
                        <input type="button" onClick={onSubmit} value="Submit Data" className="btn btn-primary w-100" />
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}