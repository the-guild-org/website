import tw from 'twin.macro';

const Button = tw.button`
text-sm
text-gray-500
hover:text-gray-600
dark:hover:text-gray-400
bg-gray-200
hover:bg-gray-300
dark:bg-gray-800
dark:hover:bg-gray-700
px-5 py-4
border-0
rounded-xl
font-bold
cursor-pointer
transition-all
duration-200`;

export default Button;
