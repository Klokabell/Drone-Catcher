function InViolation(x, y) {
    let dx = x/1000
    let dy = y/1000
    const cX = 250
    const cY = 250

    dx = dx.toFixed(2)
    dy = dy.toFixed(2)
    
    if((dx-cX) * (dx-cX) + (dy-cX) * (dy-cY) <= (100 * 100))
        return true;
    else 
        return false;
}

module.exports = { InViolation }
