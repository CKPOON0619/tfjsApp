
F
batch_normalization_2/betaConst*
valueB	�*
dtype0
F
batch_normalization_1/betaConst*
valueB	�*
dtype0
C
batch_normalization/betaConst*
value
B3*
dtype0
@
inputsPlaceholder*
dtype0*
shape:���������3
D
batch_normalization/gammaConst*
value
B3*
dtype0
<
dense/kernelConst*
valueB	3�*
dtype0
6

dense/biasConst*
valueB	�*
dtype0
G
batch_normalization_1/gammaConst*
valueB	�*
dtype0
?
dense_1/kernelConst*
valueB
��*
dtype0
8
dense_1/biasConst*
valueB	�*
dtype0
`
2batch_normalization/moments/mean/reduction_indicesConst*
valueB: *
dtype0
P
#batch_normalization/batchnorm/add/yConst*
valueB
 *o�:*
dtype0
G
batch_normalization_2/gammaConst*
valueB	�*
dtype0
>
dense_2/kernelConst*
valueB	�2*
dtype0
7
dense_2/biasConst*
value
B2*
dtype0
=
dense_3/kernelConst*
valueB2*
dtype0
=
dense_3/biasConst*
valueB*#�1�*
dtype0
�
 batch_normalization/moments/meanMeaninputs2batch_normalization/moments/mean/reduction_indices*
	keep_dims(*
T0*

Tidx0
p
#batch_normalization/moments/SqueezeSqueeze batch_normalization/moments/mean*
squeeze_dims
 *
T0
u
-batch_normalization/moments/SquaredDifferenceSquaredDifferenceinputs batch_normalization/moments/mean*
T0
�
$batch_normalization/moments/varianceMean-batch_normalization/moments/SquaredDifference2batch_normalization/moments/mean/reduction_indices*
	keep_dims(*
T0*

Tidx0
v
%batch_normalization/moments/Squeeze_1Squeeze$batch_normalization/moments/variance*
squeeze_dims
 *
T0
}
!batch_normalization/batchnorm/addAdd%batch_normalization/moments/Squeeze_1#batch_normalization/batchnorm/add/y*
T0
X
#batch_normalization/batchnorm/RsqrtRsqrt!batch_normalization/batchnorm/add*
T0
q
!batch_normalization/batchnorm/mulMul#batch_normalization/batchnorm/Rsqrtbatch_normalization/gamma*
T0
^
#batch_normalization/batchnorm/mul_1Mulinputs!batch_normalization/batchnorm/mul*
T0
{
#batch_normalization/batchnorm/mul_2Mul#batch_normalization/moments/Squeeze!batch_normalization/batchnorm/mul*
T0
p
!batch_normalization/batchnorm/subSubbatch_normalization/beta#batch_normalization/batchnorm/mul_2*
T0
{
#batch_normalization/batchnorm/add_1Add#batch_normalization/batchnorm/mul_1!batch_normalization/batchnorm/sub*
T0
x
dense/MatMulMatMul#batch_normalization/batchnorm/add_1dense/kernel*
transpose_b( *
T0*
transpose_a( 
R
dense/BiasAddBiasAdddense/MatMul
dense/bias*
T0*
data_formatNHWC
0
dense/SigmoidSigmoiddense/BiasAdd*
T0
�
"batch_normalization_1/moments/meanMeandense/Sigmoid2batch_normalization/moments/mean/reduction_indices*
	keep_dims(*
T0*

Tidx0
t
%batch_normalization_1/moments/SqueezeSqueeze"batch_normalization_1/moments/mean*
squeeze_dims
 *
T0
�
/batch_normalization_1/moments/SquaredDifferenceSquaredDifferencedense/Sigmoid"batch_normalization_1/moments/mean*
T0
�
&batch_normalization_1/moments/varianceMean/batch_normalization_1/moments/SquaredDifference2batch_normalization/moments/mean/reduction_indices*
	keep_dims(*
T0*

Tidx0
z
'batch_normalization_1/moments/Squeeze_1Squeeze&batch_normalization_1/moments/variance*
squeeze_dims
 *
T0
�
#batch_normalization_1/batchnorm/addAdd'batch_normalization_1/moments/Squeeze_1#batch_normalization/batchnorm/add/y*
T0
\
%batch_normalization_1/batchnorm/RsqrtRsqrt#batch_normalization_1/batchnorm/add*
T0
w
#batch_normalization_1/batchnorm/mulMul%batch_normalization_1/batchnorm/Rsqrtbatch_normalization_1/gamma*
T0
i
%batch_normalization_1/batchnorm/mul_1Muldense/Sigmoid#batch_normalization_1/batchnorm/mul*
T0
�
%batch_normalization_1/batchnorm/mul_2Mul%batch_normalization_1/moments/Squeeze#batch_normalization_1/batchnorm/mul*
T0
v
#batch_normalization_1/batchnorm/subSubbatch_normalization_1/beta%batch_normalization_1/batchnorm/mul_2*
T0
�
%batch_normalization_1/batchnorm/add_1Add%batch_normalization_1/batchnorm/mul_1#batch_normalization_1/batchnorm/sub*
T0
~
dense_1/MatMulMatMul%batch_normalization_1/batchnorm/add_1dense_1/kernel*
transpose_b( *
T0*
transpose_a( 
X
dense_1/BiasAddBiasAdddense_1/MatMuldense_1/bias*
T0*
data_formatNHWC
4
dense_1/SigmoidSigmoiddense_1/BiasAdd*
T0
�
"batch_normalization_2/moments/meanMeandense_1/Sigmoid2batch_normalization/moments/mean/reduction_indices*
	keep_dims(*
T0*

Tidx0
t
%batch_normalization_2/moments/SqueezeSqueeze"batch_normalization_2/moments/mean*
squeeze_dims
 *
T0
�
/batch_normalization_2/moments/SquaredDifferenceSquaredDifferencedense_1/Sigmoid"batch_normalization_2/moments/mean*
T0
�
&batch_normalization_2/moments/varianceMean/batch_normalization_2/moments/SquaredDifference2batch_normalization/moments/mean/reduction_indices*
	keep_dims(*
T0*

Tidx0
z
'batch_normalization_2/moments/Squeeze_1Squeeze&batch_normalization_2/moments/variance*
squeeze_dims
 *
T0
�
#batch_normalization_2/batchnorm/addAdd'batch_normalization_2/moments/Squeeze_1#batch_normalization/batchnorm/add/y*
T0
\
%batch_normalization_2/batchnorm/RsqrtRsqrt#batch_normalization_2/batchnorm/add*
T0
w
#batch_normalization_2/batchnorm/mulMul%batch_normalization_2/batchnorm/Rsqrtbatch_normalization_2/gamma*
T0
k
%batch_normalization_2/batchnorm/mul_1Muldense_1/Sigmoid#batch_normalization_2/batchnorm/mul*
T0
�
%batch_normalization_2/batchnorm/mul_2Mul%batch_normalization_2/moments/Squeeze#batch_normalization_2/batchnorm/mul*
T0
v
#batch_normalization_2/batchnorm/subSubbatch_normalization_2/beta%batch_normalization_2/batchnorm/mul_2*
T0
�
%batch_normalization_2/batchnorm/add_1Add%batch_normalization_2/batchnorm/mul_1#batch_normalization_2/batchnorm/sub*
T0
~
dense_2/MatMulMatMul%batch_normalization_2/batchnorm/add_1dense_2/kernel*
transpose_b( *
T0*
transpose_a( 
X
dense_2/BiasAddBiasAdddense_2/MatMuldense_2/bias*
T0*
data_formatNHWC
4
dense_2/SigmoidSigmoiddense_2/BiasAdd*
T0
h
dense_3/MatMulMatMuldense_2/Sigmoiddense_3/kernel*
transpose_b( *
T0*
transpose_a( 
X
dense_3/BiasAddBiasAdddense_3/MatMuldense_3/bias*
T0*
data_formatNHWC
+
outputSigmoiddense_3/BiasAdd*
T0 " 