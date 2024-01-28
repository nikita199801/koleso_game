function getAllowedTimeout(timeout, userTimeoutEmulationId) {
    return allowedTimeoutId = setTimeout(() => {
        clearTimeout(userTimeoutEmulationId);
        console.log(`Player ${this.id} timeout`);
    }, timeout - 1);
}

module.exports = {
    getAllowedTimeout
}