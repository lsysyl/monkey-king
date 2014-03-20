// Given a rotated and sorted array like {6, 7, 8, 1, 2, 3} find an element

public int find(int[] array, int target) {
    int len = array.length;
    
    int transition = findTransition(array);
    if (transition == 0) {
        return bsearch(0, len - 1, array, target);
    }    
    int leftside = bsearch(0, trasition - 1, array, target);
    int rightside = bsearch(trasition, len - 1, array, target);
    if (leftside != -1) {
        return leftside;
    }
    if (rightside != -1) {
        return rightside;
    }
    return -1;
}

private int findTransition(int[] array) {
    int len = array.length;
    return bsearchtran(0, len - 1, array);
}

private int bsearchtran(int start, int end, int[] array) {
    if (start > end || array[start] < array[end]) {
        return start;
    }
    int mid = (start + end) / 2;
    if (array[start] > array[mid]) {
        if (mid - start == 1) return mid;
        else return bsearchtran(start, mid - 1, array);
    }
    return bsearchtran(mid, end, array);
}    
    
private int bsearch(int start, int end, int[] array, int target) {
    int len = array.length;
    int mid = (start + end)/2;
    
    if (start > end || (start == end && target != array[start])) {
        return -1;
    }    
    
    if (target == array[mid]) {
        return mid;
    }
    if (target < array[mid]) {
        return bsearch(start, mid-1, array, target);
    }
    return bsearch(mid, end, array, target);
}

private int bsearch(int[] array, int target) {
    int len = array.length;
    int i = 0;
    int j = len - 1;
    while (j - i > 1) {
        int mid = (i + j) / 2;
        if (target == array[mid]) {
            return mid;
        }
        if (target < array[mid]) {
            j = mid;
        } else {
            i = mid;
        }
    }
    if (target == array[j]) {
        return array[j];
    }
    return -1;
}

private int bsearchtran(int[] array) {
    int len = array.length;
    int i = 0;
    int j = len - 1;
    while (j - i > 1 && array[i] > array[j]) {
        int mid = (i + j) / 2;
        if (array[i] < array[mid]) {
            i = mid;
        } else {
            j = mid;
        }
    }
    if (array[i] < array[j]) {
        return i;
    }
    return j;
}
