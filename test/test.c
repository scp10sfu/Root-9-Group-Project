#include <stdio.h>
#include <stdlib.h>

int result = 0;

int add(int a, int b){
  result =  a + b;
  return result;
};


int main() {
  add(20,2039102109);
  printf("Output: %d\n", result);
  return 0;
}

