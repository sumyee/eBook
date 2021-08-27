/**
 * 有 扁平数据
  let arr = [
    { id: 1, name: '部门1', pid: 0 },
    { id: 2, name: '部门2', pid: 1 },
    { id: 3, name: '部门3', pid: 1 },
    { id: 4, name: '部门4', pid: 3 },
    { id: 5, name: '部门5', pid: 4 },
  ];
 **********************
 * 输出如下
[
    {
        "id": 1,
        "name": "部门1",
        "pid": 0,
        "children": [
            {
                "id": 2,
                "name": "部门2",
                "pid": 1,
                "children": []
            },
            {
                "id": 3,
                "name": "部门3",
                "pid": 1,
                "children": [
                    // 结果 ,,,
                ]
            }
        ]
    }
]
 */

let arr = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 },
  { id: 6, name: '部门6', pid: 4 },
  { id: 7, name: '部门7', pid: 5 },
  { id: 8, name: '部门8', pid: 6 },
  { id: 9, name: '部门9', pid: 5 },
  { id: 10, name: '部门10', pid: 8 },
];

// 递归 找孩子 --- 暴力法
const getChildren = (data, pid, result) => {
  for (const item of data) {
    if (item.pid === pid) {
      const newItem = { ...item, children: [] };
      result.push(newItem);
      getChildren(data, item.id, newItem.children);
    }
  }
};

const arrayToTree = (pid) => {
  const result = [];
  getChildren(arr, pid, result);
  return result;
};
