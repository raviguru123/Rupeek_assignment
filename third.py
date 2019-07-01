import math

def prepare_num2(num1, num2):
	num1_len = len(str(num1))
	num2_len = len(str(num2))
	if(num1_len == num2_len + 1):
		return str(num2)
	else:
		num_of_zero = num1_len - num2_len
		arr = ['0' for i in range(num_of_zero-1)]

		arr = arr + list(str(num2))

	return ''.join(arr)


def check_condition_one(num):
	strnum = str(num)
	if(len(strnum) >= 2 and strnum[0] != '0'):
		return True
	return False

def check_condition_two(num1, num2):
	if(len(str(num1)) == len(num2)+1):
		return True
	return False

def check_condition_four(x, y):
	y 	= str(y)
	it 	= iter(y)
	flag =  all(any(c == ch for c in it) for ch in x)
	return flag

def iterate_and_insert(arr1, arr2, num1, max_num):
	for el in range(num1, max_num, 1):
		num2 = num - el
		num2 = prepare_num2(el, num2)
		if(check_condition_one(el) and check_condition_two(el, num2) and check_condition_four(num2, el)):
			arr1.append(str(el))
			arr2.append(num2)


def find_pair(num):
	arr1 = []
	arr2 = []
	num_length = len(str(num))

	max_num = int(math.pow(10, num_length - 1))
	iterate_and_insert(arr1, arr2, (max_num//10) * 9, max_num)
	iterate_and_insert(arr1, arr2, max_num, num)


	return [arr1, arr2]



def print_output(output, output_num):
	print()
	for index, out in enumerate(output):
		print("TEST#", index+1)
		print(len(out[0]), end = " ")
		if(len(out) >1):
			print("pairs found")
		else:
			print("pair found")
		for i in range(len(out[0])):
			print(out[0][i] ,"+", out[1][i], "=", output_num[index])

		print()



output = []
output_num = []
test_cases = int(input())

for i in range(test_cases):
	num = int(input())
	arr = find_pair(num)
	output_num.append(num)
	output.append(arr)


print_output(output, output_num)