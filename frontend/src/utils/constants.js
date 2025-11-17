export const MODES = {
  NORMAL: {
    id: 'NORMAL',
    label: 'Normal',
    description: 'Plain text extraction'
  },
  MATH: {
    id: 'MATH',
    label: 'Math',
    description: 'Mathematical expressions'
  },
  GRAPH: {
    id: 'GRAPH',
    label: 'Graph',
    description: 'Diagrams and charts'
  }
};

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];