T A L P
S R E E
Q W O P
K L M N

TREE, TAR, PEEL -> true
STARS -> false (reuse)
TRAP -> false (not adjacent) 

public class Solver {
    static class Position {
        int x;
        int y;
        public Position(int x, int y) {
            this.x = x;
            this.y = y;
        }    
    }
    
    boolean[][] visited;
    String word;
            
    public boolean findWord(String word, String[][] board) {
        this.word = word;
        int N = board.length;
        int M = board[0].length;
        visited = new boolean[N+2][M+2];
   
        Map<String, Collection<Position>> mem = new HashMap<String, Collection<Position>>();
        for(int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                String curChar = board[i][j];
                if (!mem.containsKey(curChar)) {
                    mem.put(curChar, new ArrayList<Position>());
                }
                Collection<Postion> positions = mem.get(curChar);
                positions.add(new Position(i+1, j+1));
            }
        }
    
        // With map, start checking all start positions with word[0]
        String firstLetter = new String(word.substring(0,1));
        if (!mem.containsKey(firstLetter)) {
           return false;
        }
    
        Collection<Position> allPos = mem.get(firstLetter);
        for (Position pos : allPos) {
            Arrays.fill(visited, false);
            if (dfs(pos, "", board) {
                return true;
            }
        }
        return false;                       
    }

    private boolean dfs(Position start, String prefix, String[][] board) {
        int N = board.length;
        int M = board[0].length;
        int x = start.x;
        int y = start.y;
        // base case
        if (x < 1 || x > N) {
            return false;
        }
        if (y < 1 || y > M) {
            return false;
        }
        // Add a conditional to check current letter so don't have to waste time.
        if (board[x][y] != word.substring(prefix.length(), prefix.length()+1) {
            return false;
        }  
        
        String curPrefix = prefix + board[x][y];
        if (word.equals(curPrefix)) {
            return true;
        }
        visited[x][y] = true;
        // Check eight adjacent unvisited positions and recurse
        for (int i = -1; i <= 1; i++) {
            for (int j = -1; j <= 1; j++) {
                if (i != 0 && j != 0) {
                    if (!visited(x+i, y+j) && (x+i)>0 && (x+i) <= N && (y+j) > 0 && (y+j) <= M) {
                        if (dfs(new Position(x+i, y+j), curPrefix, board)) return true;  
                    }
                }
            }
        }
        return false;                           
    }
}
