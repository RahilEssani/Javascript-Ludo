function Queue(){
    this.a = [];
    this.getLength = () => this.a.length;
    this.enqueue = (para) => {
        this.a.push(para);
    };
    this.dequeue = () => {
        if(this.a.length > 0){
            var result = this.a[0];
            this.a = this.a.slice(1, this.a.length);
            return result;
        }
    }
    this.peek = () => this.a[0];
}
