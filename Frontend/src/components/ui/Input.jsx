function Input({

label,

icon,

...props

}){

return(

<div className="mb-5">

{label && (

<label
className="
block
font-semibold
mb-2
"
>

{label}

</label>

)}

<div className="relative">

{icon && (

<div
className="
absolute
left-4
top-1/2
-translate-y-1/2
text-gray-500
"
>

{icon}

</div>

)}

<input

{...props}

className={`
eco-input
${icon ? "pl-12" : ""}
`}

/>

</div>

</div>

);

}

export default Input;