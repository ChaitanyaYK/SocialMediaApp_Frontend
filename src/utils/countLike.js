
function countLike(likes) {

    const thousandLike = likes / 1000;
    if (likes > 1000) {
        return `${thousandLike} k`;
    }

    const milionLike = likes / 1000000;
    if (likes > 100000) {
        return `${milionLike} m`;
    }
}

export default countLike;