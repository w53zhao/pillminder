function Container(data) {
    this.id = data.id;
    this.pillType = data.pill_type;
    this.reminderTime = data.reminder_time;
    this.frequency = data.frequency;
}

module.exports = Container;