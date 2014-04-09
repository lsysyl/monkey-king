public boolean isBST(Node root) {
    if (root == null) return true;
    
    if (root.left != null && root.right != null) {
        if (root.left.val > root.val || root.right.val < root.val) return false;
    }
    
    return isBST(root.left) && isBST(root.right);
}    
