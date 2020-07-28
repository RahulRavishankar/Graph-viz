class QElement { 
	constructor(element, priority) 
	{ 
		this.element = element; 
		this.priority = priority; 
	} 
} 

class PriorityQueue { 
	constructor() 
	{ 
		this.items = []; 
	} 
	enqueue(element, priority) 
	{ 
		var qElement = new QElement(element, priority); 
		var contain = false; 

		for (var i = 0; i < this.items.length; i++) { 
			if (this.items[i].priority > qElement.priority) {  
				this.items.splice(i, 0, qElement); 
				contain = true; 
				break; 
			} 
		} 

		if(!contain) { 
			this.items.push(qElement); 
		} 
	} 
	// return the dequeued element and remove it. 
	dequeue() 
	{ 
		if (this.isEmpty()) 
			return "Underflow"; 
		return this.items.shift(); 
	} 
	// returns the lowest priorty element of the queue 
	rear() 
	{ 
		if (this.isEmpty()) 
			return "No elements in Queue"; 
		return this.items[this.items.length - 1]; 
	} 
	isEmpty() 
	{ 
		return this.items.length === 0; 
	}
} 
export default PriorityQueue;