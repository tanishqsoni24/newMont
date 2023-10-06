import React from 'react'

export default function TaskCard(props) {
  return (
    
<div className="max-w-sm m-3 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC6ElEQVR4nO2Z20/TUBjA+4fIs08+rC6gXGSaderciCioJA7aOde1Z+DQROMFhSBeosRMQ9DAZK1vBnnTFyM+6IPGRxVNxEvavapx+P6Zc8pGl80trJd1Sb/ke9jp0v5+5/tOd7JDURaEN8C20Ay76PGz+fVc8u6NbqWaIbwBtsXjZ3/SDAf6xGPb9sW2UE4PmmEXCTDDPcXAOGk/+2x97DHl9PD42TyG1c+21lK4CtwfyulB+7lf/xOgGe53w8CEnBwWFemlqEh/u4VUSX9XyuCNMUCqTDJ4/VLN73eLKcD3Roq8jHJSyFR4UZGuFWBw4odVg9ke4KAnPV78fjg9QcZqCSDdM0RVvmrazOtvbGvmTKgEbptGCYiK9MKwAFKktYZVQJHzxgUaBa9q6QogtwKy20KGwm0hdaOF+JUMhO+MA3P+LBx8MAnit2zzvIVOvLsPO44kSrYPXbER4D8/dL4Ahm/r4wm0LzkKx5ZuQ0cEFSWE75JzBfTwu0+dAeHrAhk/+X6uKNE7N+VMgXL40p4/+uQWucZcOOc8gVrwuBK+5Ci5jrfbjhIgC7Y/UQU+S8ZphiMLm/+UcY5AVAfvQylIrC6Uzfye1Glyve0wD9zb2ar3s1WgDP6LMXhkp4AV8Mgugdrw2brgkR0CevhdiZGK8IUFu1l4ZIdAV2y4uDXoGEpC/ON85bdNf4K8nTb7UqCsFIi+mSVwrb1x6GSTmsQggviHeVPgkdUC+L8fDLh/6iLEVzLQyWnVaI8g8KH6eh7ZKdBxXNvLRJ7fJZ9x++A2KrSUUXhkpcDQqxkNso8H8YcEg8v3IHhzDFoPxU2DR1YKhKYvF/u7sOfZ2OcP193zyC6B9gGhBBq3U096gixsM8CR1QL4B2vngACh6SvAvp4xFRrZtYjtSMoVUN0KgNtCzXo+IKqS8VNNcujW1Cc0OSnUKAFBfXSAMiPwiaH9AtIkZWbgSuCSWromFGkNP8O0mXeDsj7+ASFYbb/4/zn9AAAAAElFTkSuQmCC"/>
<a href="#">
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Task-{props.level}</h5>
    </a>
    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Go <b>VIP-{props.level}</b> by step guideline process on how to certify for your weekly benefits:</p>
<p className="mb-3 my-2 font-normal text-gray-500 dark:text-gray-400">Go to this step by step guideline process on how to certify for your weekly benefits:</p>
</div>

  )
}
